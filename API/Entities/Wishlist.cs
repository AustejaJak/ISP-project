using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Wishlist
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public virtual int ClientId { get; set; }
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
