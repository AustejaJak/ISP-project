using API.Data.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace API.Extensions
{
    public static class MapOrderToDTO
    {
        public static IQueryable<OrderDTO> MapOrderToOrderDTO(this IQueryable<Order> query)
        {
            return query
            .Select(order => new OrderDTO
            {
                OrderId = order.OrderId,
                OrderDate = order.OrderDate,
                OrderCost = order.OrderCost,
                Status = order.Status,
                AttachedDocuments = order.AttachedDocuments,
                DeliveryAddress = order.DeliveryAddress,
                ClientId = order.ClientId,
                BasketId = order.BasketId,
                BasketItems = order.Basket.Items.Select(item => new BasketItemDTO()
                {
                    ProductSKU = item.Product.SKU,
                    Name = item.Product.Name,
                    Description = item.Product.Description,
                    Cost = item.Product.Cost,
                    PictureUrl = item.Product.PictureUrl,
                    Quantity = item.Quantity,
                    Type = item.Product.Type,
                    CountryOfOrigin = item.Product.CountryOfOrigin,
                    Measurements = item.Product.Measurements,
                    Weight = item.Product.Weight,
                }).ToList(),
                ShopId = order.ShopId,
                DiscountId = order.DiscountId
            }).AsNoTracking();
        }
    }
}
