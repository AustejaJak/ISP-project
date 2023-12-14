namespace API.Entities
{
    public class Discount
    {
        public int Id { get; set; }
        public string Code { get; set; } = null!; 
        public int DiscountAmount { get; set; }
        public DateTime DiscountStart { get; set; }
        public DateTime DiscountEnd { get; set;}
        public float MinimalAmount { get; set; }

    }
}
