using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class InventorySummary
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int Amount { get; set; }
        public float AveragePrice { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
