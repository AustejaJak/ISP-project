using API.Data;
using API.Data.DTOs;
using API.Entities;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class ClientService : IClientService
    {
        private readonly UserManager<Client> _userManager;
        private readonly StoreContext _storeContext;
        private readonly UserManager<Client> _clientManager;

        public ClientService(UserManager<Client> userManager, StoreContext storeContext, UserManager<Client> clientManager)
        {
            _userManager = userManager;
            _storeContext = storeContext;
            _clientManager = clientManager;
        }
        public async Task<bool> ChangeDeliveryAddress(string userId, string deliveryAddress)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return false;
            }
            user.DeliveryAddress = deliveryAddress;
            var result = await _userManager.UpdateAsync(user);
            return result.Succeeded;
        }

        public async Task<List<PaymentDetailsDTO>> GetUsersPaymentDetails(string userId)
        {
            var paymentDetails = await _storeContext.PaymentDetails
                .Where(payment => payment.ClientId.Equals(userId))
                .Select(pd => new PaymentDetailsDTO()
                { 
                    Id = pd.Id,
                    BillingStreet = pd.BillingStreet,
                    BillingCity = pd.BillingCity,
                    CardNumber = pd.CardNumber,
                })
                .ToListAsync();
            return paymentDetails;
        }

        public async Task<PaymentDetailsDTO?> AddUsersPaymentDetails(string userId, CreatePaymentDetailsDTO paymentDetailsDTO)
        {
            var client = await _clientManager.FindByIdAsync(userId);
            if (client == null)
            {
                return null;
            }

            var paymentDetails = new PaymentDetails()
            {
                CardNumber = paymentDetailsDTO.CardNumber,
                BillingStreet = paymentDetailsDTO.BillingStreet,
                BillingCity = paymentDetailsDTO.BillingCity,
                ClientId = client.Id
            };

            client.PaymentDetails.Add(paymentDetails);
            await _storeContext.PaymentDetails.AddAsync(paymentDetails);
            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result)
            {
                var dto = new PaymentDetailsDTO()
                {
                    Id = paymentDetails.Id,
                    CardNumber = paymentDetails.CardNumber,
                    BillingStreet = paymentDetails.BillingStreet,
                    BillingCity = paymentDetails.BillingCity
                };
                return dto;
            }
            return null;
        }

        public async Task<bool> RemovePaymentDetails(string userId, int paymentDetailsId)
        {
            var paymentDetails = await _storeContext.PaymentDetails.Where(x => x.Id == paymentDetailsId).SingleOrDefaultAsync();
            if (paymentDetails == null)
            {
                return false;
            }

            var client = await _clientManager.FindByIdAsync(userId);
            if (client == null)
            {
                return false;
            }

            client.PaymentDetails.Remove(paymentDetails);
            _storeContext.PaymentDetails.Remove(paymentDetails);
            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result)
            {
                return true;
            }
            return false;
        }
    }
}
