using API.Data.DTOs;

namespace API.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendEmail(EmailDTO request);
    }
}