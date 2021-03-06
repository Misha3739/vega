using System.ComponentModel.DataAnnotations;

namespace vega.Models {
    public class Model {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public string Description { get; set; }
		public Make Make { get; set; }
        public int MakeId { get; set; }
    }
}