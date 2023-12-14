using API.Data.DTOs;
using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using MailKit.Net.Smtp;
using API.Services.Interfaces;

namespace API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }
        public void SendEmail(EmailDTO request)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config["MailSettings:EmailUsername"]));
            email.To.Add(MailboxAddress.Parse(request.EmailToName));
            email.Subject = request.EmailSubject;
            email.Body = new TextPart(TextFormat.Html)
            {
                Text = request.EmailBody
            };

            using var smtp = new SmtpClient();
            smtp.Connect(_config["MailSettings:EmailHost"], 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(_config["MailSettings:EmailUsername"], _config["MailSettings:EmailPassword"]);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
