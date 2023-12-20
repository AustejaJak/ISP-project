using API.Data;
using API.Data.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly StoreContext _storeContext;

        public ReviewsController(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<ReviewDTO>>> GetProductsReviews(string productId)
        {
            var reviews = await _storeContext.Reviews
                .Where(rev => rev.ProductId.Equals(productId))
                .Select(review => new ReviewDTO()
                {
                    Rating = review.Rating,
                    Comment = review.Comment,
                    ReviewDate = review.ReviewDate,
                    LikeAmount = review.LikeAmount,
                    PictureUrl = review.PictureUrl
                }).ToListAsync();

            if (reviews.IsNullOrEmpty())
            {
                return NotFound();
            }
            return Ok(reviews);
        }

        [HttpPost("{productId}")]
        public async Task<ActionResult<ReviewDTO>> CreateReview(string productId, ReviewDTO review)
        {
            var product = await _storeContext.Products.Where(prod => prod.SKU.Equals(productId)).SingleOrDefaultAsync();
            if (product == null)
            {
                return BadRequest();
            }

            var createdReview = new Review()
            {
                Rating = review.Rating,
                Comment = review.Comment,
                ReviewDate = DateTime.Now,
                LikeAmount = review.LikeAmount,
                PictureUrl = review.PictureUrl ?? "",
                ProductId = product.SKU,
                Product = product
            };

            await _storeContext.Reviews.AddAsync(createdReview);
            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result)
            {
                var dto = new ReviewDTO()
                {
                    Rating = review.Rating,
                    Comment = review.Comment,
                    ReviewDate = review.ReviewDate,
                    LikeAmount = review.LikeAmount,
                    PictureUrl = review.PictureUrl
                };
                return Ok(dto);
            }
            return BadRequest(new ProblemDetails(){ Title = "Problem occurred while trying to save the review"});

        }
    }
}
