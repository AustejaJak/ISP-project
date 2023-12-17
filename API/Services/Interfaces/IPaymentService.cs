using API.Entities;
using Stripe;

namespace API.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket);
    }
}