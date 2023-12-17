using API.Data;
using API.Entities;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class ProductService : IProductService
    {
        private readonly StoreContext _storeContext;

        public ProductService(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        public async Task<List<Product>?> GetUnvalidatedProducts()
        {
            var products = await _storeContext.Products.Where(x => x.IsConfirmed == false).ToListAsync();
            if (products == null)
            {
                //string errorMessage = "There are no unvalidated products";
                return null;

            }
            return products;
        }

        public async Task<bool> ValidateProduct(string productId)
        {
            var product = await _storeContext.Products.Where(prod => prod.SKU.Equals(productId)).FirstOrDefaultAsync();
            if (product == null)
            {
                return false;
            }
            product.IsConfirmed = true;
            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result)
            {
                return true;
            }
            return false;
        }

        public async Task<List<Product>?> GetValidatedProducts()
        {
            var products = await _storeContext.Products.Where(x => x.IsConfirmed == true).ToListAsync();
            if (products == null)
            {
                //string errorMessage = "There are no unvalidated products";
                return null;

            }
            return products;
        }
    }
}
