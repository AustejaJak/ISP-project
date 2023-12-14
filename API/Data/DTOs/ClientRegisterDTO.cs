using API.Entities.Enums;

namespace API.Data.DTOs
{
    public class ClientRegisterDTO
    {
        public required string Username { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string Password { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Email { get; set; }
        public required DateTime BirthDate { get; set; }
        public required Gender Gender { get; set; }
        public bool? HasAccepted { get; set; }
        public required string DeliveryAddress { get; set; }
    }
}
