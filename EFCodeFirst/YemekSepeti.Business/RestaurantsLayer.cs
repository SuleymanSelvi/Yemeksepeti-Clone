using YemekSepeti.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YemekSepeti.Models.DTO;

namespace YemekSepeti.Business
{
    public class RestaurantsLayer
    {
        CodeFirstContext db = new CodeFirstContext();

        public List<RestaurantsDTO> GetAllRestaurants()
        {
            var restaurants = db.Restaurants.Select(x => new RestaurantsDTO
            {
                Id = x.Id,
                Name = x.Name,
                Password = x.Password,
                Logo = x.Logo,
                Location = x.Location
            }).ToList();

            return restaurants;
        }

        public List<RestaurantsDTO> GetRestaurantsByName(string restaurantName)
        {
            var restaurantsName = (from f in db.Foods
                                   join r in db.Restaurants
                                   on f.RestaurantId equals r.Id
                                   join c in db.Categories
                                   on f.CategoriesId equals c.Id
                                   where r.Name.Contains(restaurantName)
                                   select new RestaurantsDTO
                                   {
                                       Id = r.Id,
                                       Name = r.Name,
                                       Logo = r.Logo,
                                       Location = r.Location,
                                   }).Distinct().ToList();

            return restaurantsName;
        }

        public List<RestaurantsDTO> GetRestaurantsDetail(int id)
        {
            var restaurantDetail = db.Restaurants.Where(x => x.Id == id).Select(x => new RestaurantsDTO
            {
                Id = x.Id,
                Name = x.Name,
                Password = x.Password,
                Location = x.Location,
                Logo = x.Logo
            }).ToList();

            return restaurantDetail;
        }

        public List<FoodsDTO> GetFoodsByRestaurantsId(int id)
        {
            var food = db.Foods.Where(x => x.RestaurantId == id).Select(x => new FoodsDTO
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                Description = x.Description,
                Images = x.Images,
            }).ToList();

            return food;
        }
    }
}