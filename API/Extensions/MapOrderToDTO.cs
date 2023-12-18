﻿using API.Data.DTOs;
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
                ShopId = order.ShopId,
                DiscountId = order.DiscountId
            }).AsNoTracking();
        }
    }
}