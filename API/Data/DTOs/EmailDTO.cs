namespace API.Data.DTOs
{
    public class EmailDTO
    {
        public required string EmailToName { get; set; }
        public required string EmailSubject { get; set; }
        public required string EmailBody { get; set; }
    }
}
