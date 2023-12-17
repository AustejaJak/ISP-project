namespace API.Data.DTOs
{
    public class CreateOrderDTO
    {
        public required string Address { get; set; }
        public required string AttachedDocuments { get; set; }
        public required int ShopId { get; set; }
        public int? DiscountId { get; set; }
        public bool SaveAddress { get; set; } = false;
    }
}
