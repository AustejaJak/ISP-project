using API.Data;
using API.Data.DTOs;
using API.Entities;
using API.Extensions;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class BasketService : IBasketService
    {
        private readonly StoreContext _storeContext;

        public BasketService(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        public async Task<BasketDTO?> GetBasket(string buyerId)
        {
            var basket = await RetrieveBasket(buyerId);
            if (basket == null)
            {
                return null;
            }

            return basket.MapBasketToBasketDTO();

        }

        public async Task<string?> AddItemToBasket(string buyerId, string productId, int quantity)
        {
            var basket = await RetrieveBasket(buyerId);
            if (basket == null)
            {
                return null;
            }

            var product = await _storeContext.Products.Where(prod => prod.SKU.Equals(productId)).SingleOrDefaultAsync();
            if (product == null)
            {
                return null;
            }
            basket.AddItem(product, quantity);
            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result)
            {
                return buyerId;
            }
            return null;

        }

        public async Task<bool> RemoveBasket(string buyerId)
        {
            var basket = await RetrieveBasket(buyerId);
            if (basket == null)
            {
                return false;
            }
            _storeContext.Baskets.Remove(basket);
            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result)
            {
                return true;
            }
            return false;
        }

        public async Task<bool> RemoveItemFromBasket(string buyerId, string productId, int quantity)
        {
            var basket = await RetrieveBasket(buyerId);
            if (basket == null)
            {
                return false;
            }
            basket.RemoveItem(productId, quantity);
            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result)
            {
                return true;
            }
            return false;
        }

        public async Task<BasketDTO?> ApplyDiscount(string buyerId, string discountCode)
        {
            var basket = await RetrieveBasket(buyerId);
            if (basket == null)
            {
                return null;
            }
            var discount = await _storeContext.Discounts.Where(x => x.Code.ToLower().Equals(discountCode.ToLower())).SingleOrDefaultAsync();
            if (discount == null)
            {
                return null;
            }

            var basketCost = basket.TotalSum;
            var todaysDate = DateTime.Now;
            if (basketCost >= discount.MinimalAmount && (todaysDate >= discount.DiscountStart && todaysDate <= discount.DiscountEnd))
            {
                basketCost -= (basketCost * discount.DiscountAmount / 100);
                basket.TotalSum = basketCost;
                var result = await _storeContext.SaveChangesAsync() > 0;
                if (result)
                {
                    return basket.MapBasketToBasketDTO();
                }
                return null;
            }
            return null;

        }

        public async Task<List<BasketDTO>?> GetAllBasket()
        {
            var baskets = await _storeContext.Baskets.Select(basket => basket.MapBasketToBasketDTO()).ToListAsync();
            if (baskets == null)
            {
                return null;
            }
            return baskets;
        }




        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                return null;
            }

            return await _storeContext.Baskets
                .Include(b => b.Items)
                .ThenInclude(bI => bI.Product)
                .FirstOrDefaultAsync(x => x.ClientId.Equals(buyerId));
        }
    }
}
