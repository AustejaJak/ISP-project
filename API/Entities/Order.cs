using API.Entities.Enums;

namespace API.Entities
{
    public class Order
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public float OrderCost { get; set; }
        public OrderStatus Status { get; set; }
        public string AttachedDocuments { get; set; } = null!;
        public string DeliveryAddress { get; set; } = null!;
        public int BuyerId { get; set; }
        public int BasketId { get; set; }
        public Basket Basket { get; set; } = null!;
        public int ShopId { get; set; }
        public int? DiscountId { get; set; }
        public Discount? Discount { get; set; }


    }
}
