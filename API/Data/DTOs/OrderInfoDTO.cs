using API.Entities.Enums;

namespace API.Data.DTOs
{
    public class OrderInfoDTO
    {
        public required int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public float OrderCost { get; set; }
        public OrderStatus Status { get; set; }
        public required string AttachedDocuments { get; set; }
        public required string DeliveryAddress { get; set; }
        public required string ClientName { get; set; }
        public List<BasketItemDTO> OrderItems { get; set; } = new List<BasketItemDTO>();
        public required string ShopName { get; set; }
        public required string DiscountName { get; set; }
    }
}
