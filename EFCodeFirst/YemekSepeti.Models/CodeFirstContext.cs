using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace YemekSepeti.Models
{
    public class CodeFirstContext : DbContext
    {
        public DbSet<Categories> Categories { get; set; }
        public DbSet<Restaurants> Restaurants { get; set; }
        public DbSet<Foods> Foods { get; set; }
        public DbSet<Users> Users { get; set; }
    }
}