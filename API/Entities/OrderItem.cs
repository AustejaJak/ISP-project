using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class OrderItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; } = null!;
        public int Quantity { get; set; }
        public virtual string ProductId { get; set; } = null!;
        public virtual Product Product { get; set; } = null!;
        public virtual int OrderId { get; set; }
        public virtual Order Order { get; set; } = null!;
    }
}
