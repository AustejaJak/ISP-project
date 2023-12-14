using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class BasketItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; } = null!;
        public int Quantity { get; set; }
        public virtual string ProductId { get; set; } = null!;
        public virtual Product Product { get; set; } = null!;
        public virtual int BasketId { get; set; }
        public virtual Basket Basket { get; set; } = null!;

    }
}
