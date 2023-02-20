using YemekSepeti.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YemekSepeti.Models.DTO;

namespace YemekSepeti.Business
{
    public class FoodsLayer
    {
        CodeFirstContext db = new CodeFirstContext();

        public List<FoodsDTO> GetAllFoods(int price)
        {
            var foods = db.Foods.Where(x=> x.Price < price).Select(x => new FoodsDTO
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                Description = x.Description,
                Images = x.Images,
                FoodRestaurantName = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Name,
                RestaurantId = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Id
            }).ToList();

            return foods;
        }

        //public List<FoodsDTO> GetFoodsByOrderPrice(int priceL, int priceH)
        //{
        //    var food = db.Foods.Where(x => x.Price > priceL && x.Price < priceH).Select(x => new FoodsDTO
        //    {
        //        Id = x.Id,
        //        Name = x.Name,
        //        Price = x.Price,
        //        Description = x.Description,
        //        Images = x.Images,
        //        FoodRestaurantName = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Name,
        //        RestaurantId = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Id
        //    }).ToList();

        //    return food;
        //}

        //public List<FoodsDTO> GetFoodsByCategoryByOrderPrice(int priceL, int priceH, int categoryId)
        //{
        //    var food = db.Foods.Where(x => x.Price > priceL && x.Price < priceH && x.CategoriesId == categoryId).Select(x => new FoodsDTO
        //    {
        //        Id = x.Id,
        //        Name = x.Name,
        //        Price = x.Price,
        //        Description = x.Description,
        //        Images = x.Images,
        //        FoodRestaurantName = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Name,
        //        RestaurantId = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Id
        //    }).ToList();

        //    return food;
        //}

        public FoodsDTO GetFoodDetalis(int id)
        {
            var foodDetail = db.Foods.FirstOrDefault(x => x.Id == id);
            if (foodDetail == null)
            {
                return null;
            }
            var foodDto = new FoodsDTO
            {
                Id = foodDetail.Id,
                Name = foodDetail.Name,
                Images = foodDetail.Images,
                Price = foodDetail.Price,
                Description = foodDetail.Description,
                RestaurantId = db.Restaurants.FirstOrDefault(j => j.Id == foodDetail.RestaurantId).Id,
                FoodRestaurantName = db.Restaurants.FirstOrDefault(j => j.Id == foodDetail.RestaurantId).Name,
                CategoryName = db.Categories.FirstOrDefault(j => j.Id == foodDetail.CategoriesId).Name
            }; 
            return foodDto;
        }

        public List<FoodsDTO> GetFoodsById(int categoriesId)
        {
            var foods = db.Foods.Where(x => x.CategoriesId == categoriesId).Select(x => new FoodsDTO
            {
                Id = x.Id,
                Name = x.Name,
                Images = x.Images,
                Price = x.Price,
                Description = x.Description,
                RestaurantId = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Id,
                FoodRestaurantName = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Name
            }).ToList();

            return foods;
        }

        public List<FoodsDTO> GetFoodsByName(string food)
        {
            //var foodName = db.Foods.Where(x=> x.Name.Contains(food)/* == food*/).Select(x => new FoodsDTO
            //{
            //    Name = x.Name,
            //    Images = x.Images,
            //    Price = x.Price,
            //    Description = x.Description,
            //    FoodRestaurantName = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Name
            //}).ToList();

            var foodName = (from f in db.Foods
                            join r in db.Restaurants
                            on f.RestaurantId equals r.Id
                            join c in db.Categories
                            on f.CategoriesId equals c.Id
                            where f.Name.Contains(food)/* || r.Name.Contains(food)*/
                            select new FoodsDTO
                            {
                                Id = f.Id,
                                Name = f.Name,
                                Price = f.Price,
                                Images = f.Images,
                                Description = f.Description,
                                FoodRestaurantName = r.Name
                            }).ToList();

            return foodName;
        }

        public List<FoodsDTO> GetFoodsByFoodCategoryId(int foodId)
        {
            var foodCategoryId = db.Foods.FirstOrDefault(x => x.Id == foodId).CategoriesId;

            var foodCategory = db.Foods.Where(x => x.CategoriesId == foodCategoryId).Select(x => new FoodsDTO
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                Description = x.Description,
                Images = x.Images,
                FoodRestaurantName = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Name,
                RestaurantId = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Id,
                CategoryName = db.Categories.FirstOrDefault(j => j.Id == x.CategoriesId).Name
            }).ToList();

            return foodCategory;
        }
    }
}