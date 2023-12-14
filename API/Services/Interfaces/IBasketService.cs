using API.Data.DTOs;

namespace API.Services.Interfaces
{
    public interface IBasketService
    {
        Task<string?> AddItemToBasket(string buyerId, string productId, int quantity);
        Task<BasketDTO> ApplyDiscount(string buyerId, int discountId);
        Task<List<BasketDTO>> GetAllBasket();
        Task<BasketDTO> GetBasket(string buyerId);
        Task<bool> RemoveBasket(string buyerId);
        Task<bool> RemoveItemFromBasket(string buyerId, string productId, int quantity);
    }
}