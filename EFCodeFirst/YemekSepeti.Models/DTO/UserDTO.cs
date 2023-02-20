using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YemekSepeti.Models.DTO
{
    public class UserDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Image { get; set; }
    }
}