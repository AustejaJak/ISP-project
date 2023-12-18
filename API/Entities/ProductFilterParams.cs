namespace API.Entities
{
    public class ProductFilterParams
    {
        public string? Types { get; set; }
        public string? Brands { get; set; }
        public float? PriceFrom { get; set; }
        public float? PriceTo { get; set; }
    }
}
