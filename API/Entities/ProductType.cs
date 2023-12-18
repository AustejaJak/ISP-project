using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class ProductType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Type { get; set; } = null!;
    }
}
