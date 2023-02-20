using YemekSepeti.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YemekSepeti.Business
{
    public class AdminLayer
    {
        CodeFirstContext db = new CodeFirstContext();

        public bool UploadCategory(string categoryName, /*HttpPostedFileBase categoryImages,*/string editCategoryImage)
        {
            if (!string.IsNullOrEmpty(categoryName)/* && categoryImages != null && categoryImages.ContentLength > 0*/)
            {
                var newCategory = new Categories
                {
                    Name = categoryName,
                    Images = editCategoryImage
                };

                db.Categories.Add(newCategory);
                db.SaveChanges();

                return true;
            }

            return false;
        }

        public bool UploadRestaurant(string restaurantName, string restaurantPassword, string restaurantLocation,/* HttpPostedFileBase restaurantLogo,*/ int restaurantCategoryId,
            string editRestaurantImage)
        {
            if ((!string.IsNullOrEmpty(restaurantName)) && !string.IsNullOrEmpty(restaurantPassword) && !string.IsNullOrEmpty(restaurantLocation)
               /* && restaurantLogo != null && restaurantLogo.ContentLength > 0*/ && restaurantCategoryId >= 0)
            {
                var newRestaurant = new Restaurants
                {
                    Name = restaurantName,
                    Password = restaurantPassword,
                    Location = restaurantLocation,
                    Logo = editRestaurantImage,
                    CategoriesId = restaurantCategoryId
                };

                db.Restaurants.Add(newRestaurant);
                db.SaveChanges();

                return true;
            }

            return false;
        }

        public bool UploadFood(string foodName, decimal foodPrice, string foodDescription,/* HttpPostedFileBase foodImages,*/ int foodCategoryId, int foodRestaurantId,string editFoodImage)
        {
            if ((!string.IsNullOrEmpty(foodName)) && foodPrice >= 0 && !string.IsNullOrEmpty(foodDescription)
               /* && foodImages != null && foodImages.ContentLength > 0*/ && foodCategoryId >= 0 && foodRestaurantId >= 0)
            {
                var newFood = new Foods
                {
                    Name = foodName,
                    Price = foodPrice,
                    Description = foodDescription,
                    Images = editFoodImage,
                    CategoriesId = foodCategoryId,
                    RestaurantId = foodRestaurantId
                };

                db.Foods.Add(newFood);
                db.SaveChanges();

                return true;
            }

            return false;
        }
    }
}