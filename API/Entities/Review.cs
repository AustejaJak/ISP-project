using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Review
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = null!; 
        public DateTime ReviewDate { get; set; } = DateTime.Now;
        public int LikeAmount { get; set; }
        public string? PictureUrl { get; set; }
        public virtual string ProductId { get; set; }
        public virtual Product Product { get; set; } = null!;

    }
}
