namespace API.Data.DTOs
{
    public class BasketItemDTO
    {
        public required string ProductSKU { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public float Cost { get; set; }
        public string PictureUrl { get; set; } = null!;
        public int Quantity { get; set; }
        public string Type { get; set; } = null!;
        public string CountryOfOrigin { get; set; } = null!;
        public string Measurements { get; set; } = null!;
        public float Weight { get; set; }
    }
}
