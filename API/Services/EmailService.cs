using API.Data.DTOs;
using API.Services.Interfaces;
using SendGrid.Helpers.Mail;
using SendGrid;

namespace API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }
        public async Task SendEmail(EmailDTO request)
        {
            var apiKey = _config["MailSettings:ApiKey"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(_config["MailSettings:EmailHost"], "ISP-Ecommerce");
            var subject = request.EmailSubject;
            var to = new EmailAddress(request.EmailName, request.UserName);
            var plainTextContent = request.EmailBody;
            var htmlContent = "";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
