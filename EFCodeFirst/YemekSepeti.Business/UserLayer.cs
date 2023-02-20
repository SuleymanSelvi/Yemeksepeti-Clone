using YemekSepeti.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static YemekSepeti.Business.Ultilities;

namespace YemekSepeti.Business
{
    public class UserLayer
    {
        CodeFirstContext db = new CodeFirstContext();

        public Users Login(string name, string password)
        {
            var exitsUser = db.Users.FirstOrDefault(x => x.Name == name && x.Password == password);
            return exitsUser;
        }
        public YemeksepetiResponse Registir(string name, string email, string password)
        {
            var response = new YemeksepetiResponse();

            var exitsUser = db.Users.Where(x => x.Name == name || x.Email == email).Count();

            if (exitsUser >= 1)
            {
                response.Result = false;
                response.ErrorMessage = "Kullanıcı Adı veya Email Kullanılmaktadır !";
                return response;
            }
            else
            {
                if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(password))
                {
                    response.Result = false;
                    response.ErrorMessage = "Tüm alanları doldurunuz !";
                    return response;
                }
                else
                {
                    var newUser = new Users
                    {
                        Name = name,
                        Email = email,
                        Password = password,
                        CreatedDate = DateTime.Now
                    };

                    db.Users.Add(newUser);
                    db.SaveChanges();

                    response.Result = true;
                }
            }

            return response;
        }
    }
}