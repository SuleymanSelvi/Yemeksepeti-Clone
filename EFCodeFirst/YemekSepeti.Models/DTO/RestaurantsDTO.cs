using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YemekSepeti.Models.DTO
{
    public class RestaurantsDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Logo { get; set; }
        public string Location { get; set; }
    }
}