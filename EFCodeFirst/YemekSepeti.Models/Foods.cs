﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace YemekSepeti.Models
{
    public class Foods
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }     
        public string Name { get; set; }        
        public decimal Price { get; set; }  
        public string Description { get; set; } 
        public string Images { get; set; }

        [ForeignKey("Restaurants")]
        public int RestaurantId { get; set; }
        public virtual Restaurants Restaurants { get; set; }

        [ForeignKey("Categories")]
        public int CategoriesId { get; set; }
        public virtual Categories Categories { get; set; }
    }
}