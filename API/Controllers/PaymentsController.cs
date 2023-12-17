using API.Data;
using API.Data.DTOs;
using API.Entities.Enums;
using API.Extensions;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly IConfiguration _config;
        private readonly StoreContext _context;

        public PaymentsController(IPaymentService paymentService, IConfiguration config, StoreContext context)
        {
            _paymentService = paymentService;
            _config = config;
            _context = context;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDTO>> CreateOrUpdatePaymentIntent()
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
                return NotFound();
            }

            var intent = await _paymentService.CreateOrUpdatePaymentIntent(basket);

            if (intent == null)
            {
                return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });
            }

            basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
            basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;

            _context.Update(basket);
            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
            {
                return BadRequest(new ProblemDetails { Title = "Problem updating basket with intent" });
            }

            return Ok(basket.MapBasketToBasketDTO());

        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"],
                _config["StripeSettings:WhSecret"]);

            var charge = (Charge)stripeEvent.Data.Object;

            var order = await _context.Orders.FirstOrDefaultAsync(x => x.PaymentIntentId == charge.PaymentIntentId);

            if (order != null && charge.Status == "succeeded")
            {
                order.Status = OrderStatus.PAYMENT_RECEIVED;
            }

            await _context.SaveChangesAsync();
            return new EmptyResult();


        }
    }
}
