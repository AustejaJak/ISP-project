using API.Entities.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class OrderSummary
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public float AverageSum { get; set; }
        public DateTime GenerationDate { get; set; } = DateTime.Now;
        public virtual ICollection<Order> Order { get; set; } = new List<Order>();
    }
}
