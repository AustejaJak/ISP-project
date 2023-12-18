using API.Data;
using API.Data.DTOs;
using API.Entities;
using API.Extensions;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketsController : ControllerBase
    {
        private readonly StoreContext _context;
        private readonly IBasketService _basketService;

        public BasketsController(StoreContext storeContext, IBasketService basketService)
        {
            _context = storeContext;
            _basketService = basketService;
        }


        private Basket CreateBasket()
        {
            var buyerId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(7) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            }

            var basket = new Basket { ClientId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }
        [Authorize]
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDTO>> GetUsersBasket()
        {
            var basket = await _basketService.GetBasket(GetBuyerId());
            if (basket == null)
            {
                return NotFound();
            }
            return Ok(basket);

        }

        [HttpDelete("DeleteBasket")]
        public async Task<ActionResult> DeleteUsersBasket()
        {
            var result = await _basketService.RemoveBasket(GetBuyerId());
            if (result)
            {
                return StatusCode(204);
            }
            return NotFound();
        }
        [Authorize]
        [HttpPost("AddItem")]
        public async Task<ActionResult<BasketDTO>> AddItemToBasket(string productId, int quantity)
        {
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null)
            {
                basket = CreateBasket();
            }

            var product = await _context.Products.Where(prod => prod.SKU.Equals(productId)).SingleOrDefaultAsync();
            if (product == null) return BadRequest(new ProblemDetails { Title = "Product not found" });
            basket.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToBasketDTO());
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });

            ////var basket = await _basketService.AddItemToBasket(GetBuyerId(), productId, quantity);
            //if (basket == null)
            //{
            //    return NotFound();
            //}
            //return Ok(basket);
        }

        [HttpDelete("RemoveItem")]
        public async Task<ActionResult> RemoveBasketItem(string productId, int quantity)
        {
            //var result = await _basketService.RemoveItemFromBasket(GetBuyerId(), productId, quantity);
            //if (result)
            //{
            //    return NotFound();
            //}
            //return StatusCode(204);
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) return NotFound();
            basket.RemoveItem(productId, quantity);
            var changes = await _context.SaveChangesAsync() > 0;
            if (changes) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem removing an item from the basket" });
        }

        [HttpGet("GetBaskets")]
        public async Task<ActionResult<List<BasketDTO>>> GetBaskets()
        {
            var baskets = await _basketService.GetAllBasket();
            if (baskets == null)
            {
                return NotFound();
            }
            return Ok(baskets);
        }

        [HttpPost("ApplyDiscount")]
        public async Task<ActionResult> ApplyDiscountOnBasket(int discountId)
        {
            var result = await _basketService.ApplyDiscount(GetBuyerId(), discountId);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);

        }

        private string GetBuyerId()
        {
            return HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value ?? Request.Cookies["buyerId"];
        }


        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Baskets
                .Include(it => it.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.ClientId == buyerId);


        }

    }
}
