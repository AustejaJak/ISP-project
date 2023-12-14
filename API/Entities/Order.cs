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
        public OrderStatus Status { get; set; }
        public string AttachedDocuments { get; set; } = null!;
        public string DeliveryAddress { get; set; } = null!;
        public virtual string ClientId { get; set; } = null!;
        public virtual Client Client { get; set; } = null!;
        public virtual int BasketId { get; set; }
        public virtual Basket Basket { get; set; } = null!;
        public virtual int ShopId { get; set; }
        public virtual Shop Shop { get; set; } = null!;
        public virtual int? DiscountId { get; set; }
        public virtual Discount? Discount { get; set; }


    }
}
