using API.Data;
using API.Data.DTOs;
using API.Entities;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
            var buyerId = User.Identity?.Name;
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

        [HttpPost("AddItem")]
        public async Task<ActionResult<BasketDTO>> AddItemToBasket(string productId, int quantity)
        {
            var basket = await _basketService.AddItemToBasket(GetBuyerId(), productId, quantity);
            if (basket == null)
            {
                return NotFound();
            }
            return Ok(basket);
        }

        [HttpDelete("RemoveItem")]
        public async Task<ActionResult> RemoveBasketItem(string productId, int quantity)
        {
            var result = await _basketService.RemoveItemFromBasket(GetBuyerId(), productId, quantity);
            if (result)
            {
                return NotFound();
            }
            return StatusCode(204);
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
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }

    }
}
