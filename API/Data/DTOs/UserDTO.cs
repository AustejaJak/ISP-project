namespace API.Data.DTOs
{
    public class UserDTO
    {
        public required string UserId { get; set; }
        public required string Username { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Token { get; set; }
        public BasketDTO? Basket { get; set; }
    }
}
