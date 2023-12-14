namespace API.Data.DTOs
{
    public class ChangeRolesDTO
    {
        public required string UserId { get; set; }
        public List<string> Roles { get; set; } = new List<string>();
    }
}
