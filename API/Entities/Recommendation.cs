using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Recommendation
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Category { get; set; } = null!;
        public DateTime Time { get; set; }
        public virtual string ClientId { get; set; } = null!;
    }   
}   
