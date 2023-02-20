using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YemekSepeti.Business;

namespace EFCodeFirst.Controllers
{
    public class UserController : Controller
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

        public ActionResult Login()
        {
            return View();
        }

        //[HttpPost]
        //public int Login(string name, string password)
        //{
        //    var user = db.Users.FirstOrDefault(x => x.Name == name && x.Password == password);

        //    if (user != null)
        //    {
        //        Session["User"] = user;
        //        return 1;
        //    }
        //    else
        //    {
        //        return 0;
        //    }
        //}

        [HttpPost]
        public int Login(string name, string password)
        {
            var user = userLayer.Login(name, password);

            if (user != null)
            {
                Session["User"] = user;
                return 1;
            }
            else
            {
                return 0;
            }
        }

        public ActionResult Registir()
        {
            return View();
        }

        //[HttpPost]
        //public int Registir(string name, string email, string password)
        //{
        //    var exitsUser = db.Users.SingleOrDefault(x => x.Name == name || x.Email == email);

        //    if (!string.IsNullOrEmpty(name) || !string.IsNullOrEmpty(email) || !string.IsNullOrEmpty(password))
        //    {
        //        if (exitsUser != null)
        //        {
        //            return -1;
        //        }
        //        else
        //        {
        //            var newUser = new Users
        //            {
        //                Name = name,
        //                Email = email,
        //                Password = password,
        //                CreatedDate = DateTime.Now
        //            };

        //            db.Users.Add(newUser);
        //            db.SaveChanges();

        //            Session["User"] = newUser;
        //            return 1;
        //        }
        //    }
        //    else
        //    {
        //        return 0;
        //    }
        //}

        [HttpPost]
        public string Registir(string name, string email, string password)
        {
            //var exitsUser = db.Users.FirstOrDefault(x => x.Name == name || x.Email == email);

            //if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(password))
            //{
            //    if (exitsUser != null)
            //    {
            //        return -1;
            //    }
            //    else
            //    {

            var user = userLayer.Registir(name, email, password);
            Session["User"] = user;
            return "1";

            //    }
            //}
            //else
            //{
            //    return 0;
            //}
        }
    }
}