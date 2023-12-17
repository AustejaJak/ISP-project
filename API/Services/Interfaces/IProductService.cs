using API.Entities;

namespace API.Services.Interfaces
{
    public interface IProductService
    {
        Task<List<Product>?> GetUnvalidatedProducts();
        Task<List<Product>?> GetValidatedProducts();
        Task<bool> ValidateProduct(string productId);
    }
}