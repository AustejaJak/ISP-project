using API.Data.DTOs;
using API.Entities;

namespace API.Extensions
{
    public static class MapBasketToDTO
    {
        public static BasketDTO MapBasketToBasketDTO(this Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.Id,
                ClientId = basket.ClientId,
                Items = basket.Items.Select(item => new BasketItemDTO
                {
                    ProductSKU = item.ProductId,
                    Name = item.Product.Name,
                    Description = item.Product.Description,
                    Cost = item.Product.Cost,
                    PictureUrl = item.Product.PictureUrl,
                    QuantityInStorage = item.Product.QuantityInStorage,
                    QuantityInPackage = item.Product.QuantityInPackage,
                    Type = item.Product.Type,
                    CountryOfOrigin = item.Product.CountryOfOrigin,
                    Measurements = item.Product.Measurements,
                    Weight  = item.Product.Weight,
                }).ToList()
            };
        }
    }
}
