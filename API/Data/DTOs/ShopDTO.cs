namespace API.Data.DTOs
{
    public class ShopDTO
    {
        public required string Address { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Email { get; set; }
        public required string Name { get; set; }
        public List<ShopEmployeeDTO> Employees = new();
        public List<OrderDTO> Orders = new();
    }
}
