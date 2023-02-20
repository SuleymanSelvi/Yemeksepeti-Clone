using YemekSepeti.Business;
using YemekSepeti.Models;
using YemekSepeti.Models.DTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace EFCodeFirst.Controllers
{
    public class HomeController : Controller
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
            //var allUsers = db.Users.ToList();
            var session = Session["User"] as Users;
            if (session != null)
            {
                ViewBag.Name = session.Name;
            } 
            return View();
        }

        [HttpPost]
        public JsonResult GetCategories()
        {
            //var c = categoriesLayer.GetWhereOrderBy(x => x.Name == "a", model => model.Id);

            var categories = categoriesLayer.GetCategories();

            var json = new JavaScriptSerializer().Serialize(categories);

            return new JsonResult { Data = json, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult GetAllFoods(int price)
        {
            var food = foodsLayer.GetAllFoods(price);

            var json = new JavaScriptSerializer().Serialize(food);

            return new JsonResult { Data = json, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult AddFoodToBasket(int foodId, string type)
        {
            var food = foodsLayer.GetFoodDetalis(foodId);

            var sessionFoodList = (List<FoodBasket>)Session["FoodList"];
            if (sessionFoodList == null)
            {
                sessionFoodList = new List<FoodBasket>();
            }
            if (sessionFoodList.Any(x => x.Id == food.Id))
            {
                var selectedFood = sessionFoodList.FirstOrDefault(x => x.Id == food.Id);

                if (selectedFood.BasketCount < 30)
                {
                    selectedFood.BasketCount =
                        type == "add" ? (selectedFood.BasketCount + 1) : type == "remove" ? (selectedFood.BasketCount - 1) : Convert.ToInt32(sessionFoodList.Remove(selectedFood));

                    //selectedFood.TotalBasketPrice += sessionFoodList.Sum(x => x.Price);
                    selectedFood.TotalBasketPrice = sessionFoodList.Sum(x => x.Price * x.BasketCount);

                    //if (type == "add")
                    //{
                    //    selectedFood.BasketCount++;
                    //    //selectedFood.TotalBasketPrice += selectedFood.Price;
                    //    selectedFood.TotalBasketPrice = sessionFoodList.Sum(x => x.Price) + selectedFood.Price;
                    //}
                    //else if (type == "remove")
                    //{
                    //    selectedFood.BasketCount--;
                    //    //selectedFood.TotalBasketPrice = sessionFoodList.Sum(x => x.Price);
                    //    selectedFood.TotalBasketPrice = sessionFoodList.Sum(x => x.Price) - selectedFood.Price;
                    //}
                    //else 
                    //{
                    //    sessionFoodList.Remove(selectedFood);
                    //}

                    //return Json("1", JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                sessionFoodList.Add(new FoodBasket
                {
                    Id = food.Id,
                    Name = food.Name,
                    Images = food.Images,
                    Price = food.Price,
                    BasketCount = 1,
                    TotalBasketPrice = food.Price
                });
            }
            sessionFoodList = sessionFoodList.Where(x => x.BasketCount > 0).ToList();
            Session["FoodList"] = sessionFoodList;

            var json = new JavaScriptSerializer().Serialize(sessionFoodList);
            return new JsonResult { Data = json, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public ActionResult Order()
        {
            var session = Session["User"] as Users;
            if (session != null)
            {
                ViewBag.Name = session.Name;
            }

            return View();
        }

        [HttpPost]
        public JsonResult GetFoodsForOrder()
        {
            var sessionFoodList = (List<FoodBasket>)Session["FoodList"];
            var foods = orderLayer.GetFoodsForOrder(sessionFoodList);

            var json = new JavaScriptSerializer().Serialize(foods);

            return new JsonResult { Data = json, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public ActionResult Restaurants()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetAllRestaurants()
        {
            var restaurants = restaurantsLayer.GetAllRestaurants();

            var json = new JavaScriptSerializer().Serialize(restaurants);

            return new JsonResult { Data = json, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public ActionResult Foods()
        {
            var session = Session["User"] as Users;
            if (session != null)
            {
                ViewBag.Name = session.Name;
            }

            return View();
        }

        [HttpPost]
        public JsonResult GetFoodsById(int categoriesId)
        {
            var categoriesName = foodsLayer.GetFoodsById(categoriesId);

            var json = new JavaScriptSerializer().Serialize(categoriesName);

            return new JsonResult { Data = json, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public ActionResult FoodDetail(int id)
        {
            var session = Session["User"] as Users;
            if (session != null)
            {
                ViewBag.Name = session.Name;
            }

            //var food = db.Foods.Where(x => x.Id == id).Select(x => new FoodsDTO
            //{
            //    Name = x.Name,
            //    Images = x.Images,
            //    Price = x.Price,
            //    Description = x.Description,
            //    FoodRestaurantName = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Name
            //}).FirstOrDefault();

            var foodDetail = foodsLayer.GetFoodDetalis(id);
            var foodsByFoodCategoryId = foodsLayer.GetFoodsByFoodCategoryId(id).ToList();

            var allDTO = new AllDTO
            {
                FoodDetailPageFoodDTO = foodDetail,
                FoodDTO = foodsByFoodCategoryId
            };

            return View(allDTO);
        }

        public ActionResult RestaurantDetail(int id)
        {
            var session = Session["User"] as Users;
            if (session != null)
            {
                ViewBag.Name = session.Name;
            }

            var restaurantDetail = restaurantsLayer.GetRestaurantsDetail(id).FirstOrDefault();
            var restaurantFoods = restaurantsLayer.GetFoodsByRestaurantsId(id);

            var allDto = new AllDTO
            {
                FoodDTO = restaurantFoods,
                RestaurantsDTO = restaurantDetail
            };

            return View(allDto);
        }

        [HttpPost]
        public JsonResult SearchFood(string food)
        {
            if (!string.IsNullOrEmpty(food))
            {
                var foodName = foodsLayer.GetFoodsByName(food);

                var json = new JavaScriptSerializer().Serialize(foodName);

                return new JsonResult { Data = json, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }

            return null;
        }

        [HttpPost]
        public JsonResult SearchRestaurants(string restaurants)
        {
            if (!string.IsNullOrEmpty(restaurants))
            {
                var restaurantsName = restaurantsLayer.GetRestaurantsByName(restaurants);

                var json = new JavaScriptSerializer().Serialize(restaurantsName);

                return new JsonResult { Data = json, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }

            return null;
        }

        public ActionResult LogOut()
        {
            //Session.Abandon();
            Session["User"] = null;
            return RedirectToAction("/Index");
        }

        //[HttpPost]
        //public string ClearFoodBasket(int foodId)
        //{
        //    var food = foodsLayer.GetFoodDetalis(foodId);

        //    var sessionFoodList = (List<FoodBasket>)Session["FoodList"];

        //    var selectedFood = sessionFoodList.FirstOrDefault(x => x.Id == food.Id);

        //    if (sessionFoodList.Any(x => x.Id == food.Id))
        //    {
        //        if (selectedFood.BasketCount > 1)
        //        {
        //            selectedFood.BasketCount -= 1;
        //            if (selectedFood.BasketCount == 1)
        //            {
        //                return "1";
        //            }
        //        }
        //        else if (selectedFood.BasketCount == 1)
        //        {
        //            sessionFoodList.Remove(selectedFood);
        //            return "0";
        //        }
        //    }
        //    else if (sessionFoodList == null)
        //    {
        //        return "-1";
        //    }

        //    Session["FoodList"] = sessionFoodList;

        //    return selectedFood.BasketCount.ToString();
        //}

        //[HttpPost]
        //public JsonResult GetFoodsByOrderPrice(int priceL, int priceH)
        //{
        //    //int editPrice = price;
        //    //int newPriceLow;
        //    //int newPriceHigh;

        //    //string value1 = editPrice.ToString();
        //    //string[] value2 = value1.Split(' ');
        //    //foreach (string item in value2)
        //    //{
        //    //    newPriceLow = item[0];
        //    //    newPriceHigh = item[1];
        //    //}

        //    //var editPrice = price.ToString();

        //    //string firstPrice = editPrice.Split('-')[0];
        //    //string secondPrice = editPrice.Split('-')[1];

        //    //int firstPricee = Convert.ToInt32(firstPrice);
        //    //int secondPricee = Convert.ToInt32(secondPrice);

        //    var food = foodsLayer.GetFoodsByOrderPrice(priceL, priceH);

        //    var json = new JavaScriptSerializer().Serialize(food);

        //    return new JsonResult { Data = json, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        //}

        //[HttpPost]
        //public JsonResult GetFoodsByCategoryByOrderPrice(int priceL, int priceH, int categoryId)
        //{
        //    var food = foodsLayer.GetFoodsByCategoryByOrderPrice(priceL, priceH, categoryId);

        //    var json = new JavaScriptSerializer().Serialize(food);

        //    return new JsonResult { Data = json, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        //}

        //[HttpPost]
        //public JsonResult GetFoodsById(int categoriesId)
        //{
        //    //int categoriesId = Convert.ToInt32(Request.QueryString["Id"]);

        //    var categoriesName = db.Foods.Where(x => x.CategoriesId == categoriesId).Select(x => new FoodsDTO
        //    {
        //        Name = x.Name,
        //        Images = x.Images,
        //        Price = x.Price,
        //        Description = x.Description,
        //        FoodRestaurantName = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Name
        //    }).ToList();

        //    var json = new JavaScriptSerializer().Serialize(categoriesName);

        //    return new JsonResult { Data = json, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        //}
    }
}