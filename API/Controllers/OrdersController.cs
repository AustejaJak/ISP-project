using API.Data;
using API.Data.DTOs;
using API.Entities;
using API.Entities.Enums;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
                return BadRequest(new ProblemDetails { Title = "Could not locate basket" });
            }


            var newOrder = new Order
            {
                OrderCost = basket.TotalSum,
                AttachedDocuments = order.AttachedDocuments,
                DeliveryAddress = order.Address,
                PaymentIntentId = basket.PaymentIntentId!,
                ClientId = userId,
                BasketId = basket.Id,
                ShopId = order.ShopId,
                DiscountId = order.DiscountId
            };

            _context.Orders.Add(newOrder);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return CreatedAtRoute("GetOrder", new { id = newOrder.OrderId }, newOrder);
            }
            return BadRequest(new ProblemDetails { Title = "Problem occurred while trying to save new order" });
        }
    }
}
