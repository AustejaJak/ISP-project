namespace API.Data.DTOs
{
    public class WishlistDTO
    {
        public required int Id { get; set; }
        public required List<ProductDTO> Products { get; set; }
    }
}
