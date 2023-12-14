using API.Entities;

namespace API.Services.Interfaces
{
    public interface IProductService
    {
        Task<List<Product>?> GetUnvalidatedProducts();
        Task<bool> ValidateProduct(string productId);
    }
}