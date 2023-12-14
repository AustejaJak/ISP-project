namespace API.Data.DTOs
{
    public class DiscountCodeDTO
    {
        public required string Code { get; set; }
        public required int Discount { get; set; }
        public required DateTime EndDate { get; set; }
        public required DateTime StartDate { get; set; }
        public float MinSum { get; set; }
    }
}
