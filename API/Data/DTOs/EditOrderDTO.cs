using System.Text.Json.Serialization;

namespace API.Data.DTOs
{
    public class EditOrderDTO
    {
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? DeliveryAddress { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? AttachedDocuments { get; set; }

    }
}
