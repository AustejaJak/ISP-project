namespace API.Entities
{
    public class InventorySummary
    {
        public int Id { get; set; }
        public string SKU { get; set; } = null!;
        public List<Product> Products { get; set; } = new List<Product>();
        public int Amount { get; set; }
        public float TotalCost { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
