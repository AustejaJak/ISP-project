using API.Entities.Enums;
using API.Entities;

namespace API.Data.DTOs
{
    public class OrderSummaryDTO
    {
        public int Id { get; set; }
        public float AverageSum { get; set; }
        public DateTime GenerationDate { get; set; }
        public List<OrderInfoDTO> Orders { get; set; } = new List<OrderInfoDTO>();

    }
}
