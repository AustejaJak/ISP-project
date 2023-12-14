using API.Data.DTOs;

namespace API.Services.Interfaces
{
    public interface IEmailService
    {
        void SendEmail(EmailDTO request);
    }
}