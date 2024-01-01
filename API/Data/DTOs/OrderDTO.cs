using API.Entities;
using API.Entities.Enums;

namespace API.Data.DTOs
{
    public class OrderDTO
    {
        public required int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public float OrderCost { get; set; }
        public OrderStatus Status { get; set; }
        public required string AttachedDocuments { get; set; }
        public required string DeliveryAddress { get; set; }
        public required string ClientId { get; set; }
        public List<BasketItemDTO> OrderItems { get; set; } = new List<BasketItemDTO>();
        public required int ShopId { get; set; }
        public int? DiscountId { get; set; }

    }
}
