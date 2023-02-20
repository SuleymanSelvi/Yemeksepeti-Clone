using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YemekSepeti.Business;
using YemekSepeti.Models;
using YemekSepeti.Models.DTO;

namespace EFCodeFirst.Controllers
{
    public class AdminController : Controller
    {
        UserLayer userLayer = new UserLayer();
        FoodsLayer foodsLayer = new FoodsLayer();
        CategoriesLayer categoriesLayer = new CategoriesLayer();
        RestaurantsLayer restaurantsLayer = new RestaurantsLayer();
        AdminLayer AdminLayer = new AdminLayer();
        OrderLayer orderLayer = new OrderLayer();
        Ultilities ultilities = new Ultilities();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AdminPanel()
        {
            var session = Session["User"] as Users;
            if (session != null)
            {
                ViewBag.Name = session.Name;
            }

            var getCategories = categoriesLayer.GetCategories();
            var getRestaurants = restaurantsLayer.GetAllRestaurants();

            var alldto = new AllDTO
            {
                CategoriesDTODropDownList = getCategories,
                RestaurantsDTODropDownList = getRestaurants
            };

            return View(alldto);
        }

        [HttpPost]
        public int UploadCategory(string categoryName, HttpPostedFileBase categoryImages)
        {
            //var categoryImagesName = ultilities.RandomString(10);
            var categoryFolderName = Server.MapPath("/Images/CategoryImages/"/* + categoryImagesName + "/"*/);

            if (!Directory.Exists(categoryFolderName))
            {
                Directory.CreateDirectory(categoryFolderName);
            }

            var newFileThumbnail = "";
            if (categoryImages.ContentLength > 0)
            {
                newFileThumbnail = ultilities.RandomString(10) + ".png";
                categoryImages.SaveAs(categoryFolderName + newFileThumbnail);
            }

            string image = "/Images/CategoryImages/" /*+ categoryImagesName + "/"*/ + newFileThumbnail;

            if (!string.IsNullOrEmpty(categoryName) && categoryImages != null && categoryImages.ContentLength > 0)
            {
                AdminLayer.UploadCategory(categoryName, /*categoryImages,*/ image);

                return 1;
            }
            else
            {
                return -1;
            }
        }

        [HttpPost]
        public int UploadRestaurant(string restaurantName, string restaurantPassword, string restaurantLocation, HttpPostedFileBase restaurantLogo, int restaurantCategoryId)
        {
            //var categoryImagesName = ultilities.RandomString(10);
            var restaurantFolderName = Server.MapPath("/Images/RestaurantImages/"/* + categoryImagesName + "/"*/);

            if (!Directory.Exists(restaurantFolderName))
            {
                Directory.CreateDirectory(restaurantFolderName);
            }

            var newFileThumbnail = "";
            if (restaurantLogo.ContentLength > 0)
            {
                newFileThumbnail = ultilities.RandomString(10) + ".png";
                restaurantLogo.SaveAs(restaurantFolderName + newFileThumbnail);
            }

            string image = "/Images/RestaurantImages/" /*+ categoryImagesName + "/"*/ + newFileThumbnail;



            if ((!string.IsNullOrEmpty(restaurantName)) && !string.IsNullOrEmpty(restaurantPassword) && !string.IsNullOrEmpty(restaurantLocation)
                 && restaurantLogo != null && restaurantLogo.ContentLength > 0 && restaurantCategoryId >= 0)
            {
                AdminLayer.UploadRestaurant(restaurantName, restaurantPassword, restaurantLocation, /*restaurantLogo,*/ restaurantCategoryId, image);

                return 1;
            }
            else
            {
                return -1;
            }
        }

        [HttpPost]
        public int UploadFood(string foodName, decimal foodPrice, string foodDescription, HttpPostedFileBase foodImages, int foodCategoryId, int foodRestaurantId)
        {
            //var categoryImagesName = ultilities.RandomString(10);
            var foodFolderName = Server.MapPath("/Images/FoodImages/"/* + categoryImagesName + "/"*/);

            if (!Directory.Exists(foodFolderName))
            {
                Directory.CreateDirectory(foodFolderName);
            }

            var newFileThumbnail = "";
            if (foodImages.ContentLength > 0)
            {
                newFileThumbnail = ultilities.RandomString(10) + ".png";
                foodImages.SaveAs(foodFolderName + newFileThumbnail);
            }

            string image = "/Images/FoodImages/" /*+ categoryImagesName + "/"*/ + newFileThumbnail;



            if ((!string.IsNullOrEmpty(foodName)) && foodPrice >= 0 && !string.IsNullOrEmpty(foodDescription)
                && foodImages != null && foodImages.ContentLength > 0 && foodCategoryId >= 0 && foodRestaurantId >= 0)
            {
                AdminLayer.UploadFood(foodName, foodPrice, foodDescription, /*foodImages,*/ foodCategoryId, foodRestaurantId, image);

                return 1;
            }
            else
            {
                return -1;
            }
        }
    }
}