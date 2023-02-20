using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YemekSepeti.Models;
using YemekSepeti.Models.DTO;

namespace YemekSepeti.Business
{
    public class OrderLayer
    {
        CodeFirstContext db = new CodeFirstContext();

        public List<FoodBasket> GetFoodsForOrder(List<FoodBasket> foodBasketList)
        {
            var foodIdList = foodBasketList.Select(x => x.Id).ToList();

            var foods = db.Foods.ToList().Where(x => foodIdList.Contains(x.Id)).Select(x => new FoodBasket
            {
                Id = x.Id,
                Name = x.Name,
                Images = x.Images,
                Price = x.Price,
                Description = x.Description,
                BasketCount = foodBasketList.FirstOrDefault(s => s.Id == x.Id).BasketCount,
                BasketPrice = foodBasketList.FirstOrDefault(s => s.Id == x.Id).Price * foodBasketList.FirstOrDefault(s => s.Id == x.Id).BasketCount,
                TotalBasketPrice = foodBasketList.Sum(s => s.Price * s.BasketCount),
                RestaurantId = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Id,
                FoodRestaurantName = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Name,
            }).ToList();

            return foods;
        }

        //[HttpPost]
        //public JsonResult GetFoodsForOrder()
        //{
        //    var sessionFoodList = (List<FoodBasket>)Session["FoodList"];
        //    var foodIdList = sessionFoodList.Select(x => x.Id).ToList();

        //    //var foodList = (from f in db.Foods.ToList()
        //    //                join r in db.Restaurants on f.RestaurantId equals r.Id
        //    //                where foodIdList.Contains(f.Id)
        //    //                select new FoodBasket
        //    //                {
        //    //                    Id = f.Id,
        //    //                    Name = f.Name,
        //    //                    Images = f.Images,
        //    //                    Price = f.Price,
        //    //                    Description = f.Description,
        //    //                    BasketCount = sessionFoodList.FirstOrDefault(s => s.Id == f.Id).BasketCount,
        //    //                    RestaurantId = r.Id,
        //    //                    FoodRestaurantName = r.Name,
        //    //                }).ToList();

        //    var foods = db.Foods.ToList().Where(x => foodIdList.Contains(x.Id)).Select(x => new FoodBasket
        //    {
        //        Id = x.Id,
        //        Name = x.Name,
        //        Images = x.Images,
        //        Price = x.Price,
        //        Description = x.Description,
        //        BasketCount = sessionFoodList.FirstOrDefault(s => s.Id == x.Id).BasketCount,
        //        BasketPrice = sessionFoodList.FirstOrDefault(s => s.Id == x.Id).Price * sessionFoodList.FirstOrDefault(s => s.Id == x.Id).BasketCount,
        //        TotalBasketPrice = sessionFoodList.Sum(s => s.Price * s.BasketCount),
        //        RestaurantId = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Id,
        //        FoodRestaurantName = db.Restaurants.FirstOrDefault(j => j.Id == x.RestaurantId).Name,
        //    }).ToList();

        //    var json = new JavaScriptSerializer().Serialize(foods);

        //    return new JsonResult { Data = json, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        //}
    }
}
