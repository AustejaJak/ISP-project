using API.Entities.Enums;

namespace API.Entities
{
    public class OrderSummary
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;
        public float TotalSum { get; set; }
        public DateTime OrderDate { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public User Customer { get; set; } = null!;
        public List<Product> OrderedProducts { get; set; } = new List<Product>();
        public DateTime GenerationDate { get; set; } = DateTime.Now;
    }
}
