using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace YemekSepeti.Models
{
    public class Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }     
        public string Name { get; set; }    
        public string Email { get; set; }       
        public string Password { get; set; }
        public string Images { get; set; }      
        public DateTime CreatedDate { get; set; }   
    }
}