using API.Data;
using API.Data.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SendGrid.Helpers.Mail;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlishtsController : ControllerBase
    {
        private readonly StoreContext _storeContext;
        private readonly UserManager<User> _userManager;

        public WishlishtsController(StoreContext storeContext, UserManager<User> userManager)
        {
            _storeContext = storeContext;
            _userManager = userManager;
        }

        [HttpGet(Name = "getWishlist")]
        public async Task<ActionResult<WishlistDTO>> GetUserWishlist(string userId)
        {
            var wishlist = await _storeContext.Wishlists.Include(w => w.Products).Where(x => x.ClientId.Equals(userId)).SingleOrDefaultAsync();
            if (wishlist == null)
            {
                return NotFound();
            }
            
            return Ok(wishlist.WishlistToDTO());
        }

        [HttpPost]
        public async Task<ActionResult<WishlistDTO>> AddItemToWishlist(string userId, string productId)
        {
            var wishlist = await _storeContext.Wishlists.Where(x => x.ClientId.Equals(userId)).SingleOrDefaultAsync();
            if (wishlist == null)
            {
                wishlist = await CreateWishlist(userId);
            }

            var product = await _storeContext.Products.Where(prod => prod.SKU.Equals(productId)).SingleOrDefaultAsync();
            if (product == null) return BadRequest(new ProblemDetails { Title = "Product not found" });
            var flag = wishlist.AddProduct(product);
            if (flag == false)
            {
                return BadRequest(new ProblemDetails { Title = "Product is already in the wishlist" });
            }
            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("getWishlist", new { userId = userId }, wishlist.WishlistToDTO());
            return BadRequest(new ProblemDetails { Title = "Problem saving item to wishlist" });

        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromWishlist(string userId, string productId)
        {
            var wishlist = await _storeContext.Wishlists.Where(x => x.ClientId.Equals(userId)).SingleOrDefaultAsync();
            if (wishlist == null)
            {
                return NotFound();
            }

            var product = await _storeContext.Products.Where(prod => prod.SKU.Equals(productId)).SingleOrDefaultAsync();
            if (product == null) return BadRequest(new ProblemDetails { Title = "Product not found" });
            wishlist.Products.Remove(product);
            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result)
            {
                return StatusCode(201);
            }
            return BadRequest(new ProblemDetails { Title = "There was a problem removing item from wishlist" });

        }

        private async Task<Wishlist> CreateWishlist(string userId)
        {
            var wishlist = new Wishlist()
            {
                ClientId = userId
            };

            await _storeContext.Wishlists.AddAsync(wishlist);
            await _storeContext.SaveChangesAsync();
            return wishlist;
        }
    }
}
