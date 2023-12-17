namespace API.Data.DTOs
{
    public class ProductDTO
    {
        public string SKU { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public float Cost { get; set; }
        public string PictureUrl { get; set; } = null!;
        public int QuantityInStorage { get; set; }
        public string Type { get; set; } = null!;
        public string CountryOfOrigin { get; set; } = null!;
        public string Brand { get; set; } = null!;
        public string Measurements { get; set; } = null!;
        public int QuantityInPackage { get; set; }
        public float Weight { get; set; }
        public bool IsConfirmed { get; set; }

    }
}
