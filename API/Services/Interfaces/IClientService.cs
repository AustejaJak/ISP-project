using API.Data.DTOs;
using API.Entities;

namespace API.Services.Interfaces
{
    public interface IClientService
    {
        Task<PaymentDetailsDTO?> AddUsersPaymentDetails(string userId, CreatePaymentDetailsDTO paymentDetailsDTO);
        Task<bool> ChangeDeliveryAddress(string userId, string deliveryAddress);
        Task<List<PaymentDetailsDTO>> GetUsersPaymentDetails(string userId);
        Task<bool> RemovePaymentDetails(string userId, int paymentDetailsId);
    }
}