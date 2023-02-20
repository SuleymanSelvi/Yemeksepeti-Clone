using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace YemekSepeti.Models
{
    public class Restaurants
    {
        // Attribute
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } 
        public string Name { get; set; }    
        public string Password { get; set; }    
        public string Location { get; set; }    
        public string Logo { get; set; }    

        [ForeignKey("Categories")]
        public int CategoriesId { get; set; }
        public virtual Categories Categories { get; set; }
    }
}