namespace API.Services.Interfaces
{
    public interface IClientService
    {
        Task<bool> ChangeDeliveryAddress(string userId, string deliveryAddress);
    }
}