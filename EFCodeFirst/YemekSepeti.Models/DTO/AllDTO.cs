using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YemekSepeti.Models.DTO
{
    public class AllDTO
    {
        public List<FoodsDTO> FoodDTO { get; set; }
        public FoodsDTO FoodDetailPageFoodDTO { get; set; }
        public RestaurantsDTO RestaurantsDTO { get; set; }
        public List<CategoriesDTO> CategoriesDTODropDownList { get; set; }
        public List<RestaurantsDTO> RestaurantsDTODropDownList { get; set; }
    }
}