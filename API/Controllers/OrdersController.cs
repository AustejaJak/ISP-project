using API.Data;
using API.Data.DTOs;
using API.Entities;
using API.Entities.Enums;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly StoreContext _context;
        public OrdersController(StoreContext storeContext)
        {
            _context = storeContext;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (userId == null)
            {
                return NotFound();
            }

            var orders = await _context.Orders.MapOrderToOrderDTO().Where(x => x.ClientId.Equals(userId)).ToListAsync();
            return Ok(orders);
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDTO>> GetOrder(int id)
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (userId == null)
            {
                return NotFound();
            }

            return await _context.Orders
                .MapOrderToOrderDTO()
                .Where(x => x.ClientId == User.Identity.Name && x.OrderId == id)
                .FirstOrDefaultAsync();
        }



        [Authorize]
        [HttpPost]
        public async Task<ActionResult<OrderDTO>> CreateOrder(CreateOrderDTO order)
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (userId == null)
            {
                return NotFound();
            }

            var basket = await _context.Baskets
                .Include(b => b.Items)
                .ThenInclude(p => p.Product)
                .Where(b => b.ClientId.Equals(userId)).FirstOrDefaultAsync();

            if (basket == null)
            {
                return BadRequest("Couldn't locate the basket");
            }


            var newOrder = new Order
            {
                OrderCost = basket.TotalSum,
                OrderDate = DateTime.Now,
                Status = OrderStatus.PENDING,
                AttachedDocuments = order.AttachedDocuments,
                DeliveryAddress = order.Address,
                PaymentIntentId = basket.PaymentIntentId!,
                ClientId = userId,
                Basket = basket,
                BasketId = basket.Id,
                ShopId = order.ShopId,
                DiscountId = order.DiscountId
            };

            _context.Orders.Add(newOrder);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                var oderDto = new OrderDTO()
                {
                    OrderId = newOrder.OrderId,
                    OrderDate = newOrder.OrderDate,
                    OrderCost = newOrder.OrderCost,
                    Status = newOrder.Status,
                    DeliveryAddress = newOrder.DeliveryAddress,
                    ClientId = newOrder.ClientId,
                    ShopId = newOrder.ShopId,
                    BasketId = newOrder.BasketId,
                    BasketItems = newOrder.Basket.Items.Select(item => new BasketItemDTO()
                    { 
                        ProductSKU = item.Product.SKU,
                        Name = item.Product.Name,
                        Description = item.Product.Description,
                        Cost = item.Product.Cost,
                        PictureUrl = item.Product.PictureUrl,
                        Quantity = item.Quantity,
                        Type = item.Product.Type,
                        CountryOfOrigin = item.Product.CountryOfOrigin,
                        Measurements = item.Product.Measurements,
                        Weight = item.Product.Weight,
                    }).ToList(),
                    DiscountId = newOrder.DiscountId,
                    AttachedDocuments = newOrder.AttachedDocuments,
                };
                return CreatedAtRoute("GetOrder", new { id = newOrder.OrderId }, oderDto);
            }
            return BadRequest("Problem occurred while trying to save new order");
        }


        [HttpPost("orderSummary")]
        public async Task<ActionResult<OrderSummaryDTO>> CreateOrderSummary()
        {
            var orders = await _context.Orders.Include(o => o.Client).Include(o => o.Shop).Include(o => o.Basket).ThenInclude(b => b.Items).ThenInclude(it => it.Product).Include(o => o.Discount).ToListAsync();
            if (orders.IsNullOrEmpty())
            {
                return BadRequest();
            }

            float avg = orders.Sum(x => x.OrderCost) / orders.Count;

            var summary = new OrderSummary()
            {
                AverageSum = avg,
                GenerationDate = DateTime.Now,
                Orders = orders.ToList()
            };

            _context.OrderSummaries.Add(summary);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                var dto = new OrderSummaryDTO()
                {
                    Id = summary.Id,
                    AverageSum = summary.AverageSum,
                    GenerationDate = summary.GenerationDate,
                    Orders = orders.Select(order => new OrderInfoDTO()
                    {
                        OrderId = order.OrderId,
                        OrderCost = order.OrderCost,
                        OrderDate = order.OrderDate,
                        Status = order.Status,
                        ShopName = order.Shop.Name,
                        ClientName = order.Client.Name,
                        BasketItems = order.Basket.Items.Select(item => new BasketItemDTO()
                        {
                            ProductSKU = item.ProductId,
                            Name = item.Product.Name,
                            Description = item.Product.Description,
                            Cost = item.Product.Cost,
                            PictureUrl = item.Product.PictureUrl,
                            Quantity = item.Quantity,
                            Type = item.Product.Type,
                            CountryOfOrigin = item.Product.CountryOfOrigin,
                            Measurements = item.Product.Measurements,
                            Weight = item.Product.Weight,
                        }).ToList(),
                        AttachedDocuments = order.AttachedDocuments,
                        DeliveryAddress = order.DeliveryAddress,
                        DiscountName = order.Discount?.Code ?? "",
                    }).ToList()
                };
                return Ok(dto);
            }

            return BadRequest(new ProblemDetails() { Title = "There was a problem saving the inventory summary" });

        }

        [HttpGet("orderSummaries")]
        public async Task<ActionResult<List<OrderSummaryDTO>>> GetOrderSummaries()
        {
            var summaries = await _context.OrderSummaries
                .Select(summary => new OrderSummaryDTO()
                {
                    Id = summary.Id,
                    AverageSum = summary.AverageSum,
                    GenerationDate = summary.GenerationDate,
                    Orders = summary.Orders.Select(order => new OrderInfoDTO()
                    {
                        OrderId = order.OrderId,
                        OrderCost = order.OrderCost,
                        OrderDate = order.OrderDate,
                        Status = order.Status,
                        ShopName = order.Shop.Name,
                        ClientName = order.Client.Name,
                        BasketItems = order.Basket.Items.Select(item => new BasketItemDTO()
                        {
                            ProductSKU = item.ProductId,
                            Name = item.Product.Name,
                            Description = item.Product.Description,
                            Cost = item.Product.Cost,
                            PictureUrl = item.Product.PictureUrl,
                            Quantity = item.Quantity,
                            Type = item.Product.Type,
                            CountryOfOrigin = item.Product.CountryOfOrigin,
                            Measurements = item.Product.Measurements,
                            Weight = item.Product.Weight,
                        }).ToList(),
                        AttachedDocuments = order.AttachedDocuments,
                        DeliveryAddress = order.DeliveryAddress,
                        DiscountName = order.Discount == null ? "" : order.Discount.Code,
                    }).ToList()
                }).ToListAsync();

            if (summaries.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(summaries);
        }
    }
}
