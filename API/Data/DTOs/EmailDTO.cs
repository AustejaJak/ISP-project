namespace API.Data.DTOs
{
    public class EmailDTO
    {
        public required string EmailName { get; set; }
        public required string UserName { get; set; }
        public required string EmailSubject { get; set; }
        public required string EmailBody { get; set; }
    }
}
