using API.Entities.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Order
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public float OrderCost { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.PENDING;
        public string AttachedDocuments { get; set; } = null!;
        public string DeliveryAddress { get; set; } = null!;
        public string PaymentIntentId { get; set; } = null!;
        public virtual ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
        public virtual string ClientId { get; set; } = null!;
        public virtual Client Client { get; set; } = null!;
        public virtual int ShopId { get; set; }
        public virtual Shop Shop { get; set; } = null!;
        public virtual int? DiscountId { get; set; }
        public virtual Discount? Discount { get; set; }

        public void AddItem(BasketItem item)
        {
            var orderItem = new OrderItem();
            orderItem.Product = item.Product;
            orderItem.ProductId = item.ProductId;
            orderItem.Quantity = item.Quantity;
            Items.Add(orderItem);
            
        }
    }
}
