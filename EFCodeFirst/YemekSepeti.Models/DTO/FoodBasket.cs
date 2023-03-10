using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YemekSepeti.Models.DTO
{
    public class FoodBasket
    {
        public int Id { get; set; } 
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Images { get; set; }
        public decimal BasketCount { get; set; }
        public decimal BasketPrice { get; set; }
        public decimal TotalBasketPrice { get; set; }
        public string FoodRestaurantName { get; set; }
        public int RestaurantId { get; set; }
        public string CategoryName { get; set; }
    }
}