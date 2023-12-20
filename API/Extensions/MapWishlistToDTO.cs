using API.Data.DTOs;
using API.Entities;

namespace API.Extensions
{
    public static class MapWishlistToDTO
    {
        public static WishlistDTO WishlistToDTO(this Wishlist wishlist)
        {
            var dto = new WishlistDTO()
            {
                Id = wishlist.Id,
                Products = wishlist.Products.Select(prod =>
                new ProductDTO()
                {
                    SKU = prod.SKU,
                    Name = prod.Name,
                    Description = prod.Description,
                    Cost = prod.Cost,
                    PictureUrl = prod.PictureUrl,
                    QuantityInStorage = prod.QuantityInStorage,
                    Type = prod.Type,
                    CountryOfOrigin = prod.CountryOfOrigin,
                    Brand = prod.Brand,
                    Measurements = prod.Measurements,
                    QuantityInPackage = prod.QuantityInPackage,
                    Weight = prod.Weight,
                    IsConfirmed = prod.IsConfirmed
                }).ToList()
            };
            return dto;
        }
    }
}
