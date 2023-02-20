using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YemekSepeti.Business
{
    public class Ultilities
    {
        public string RandomString(int length)
        {
            Random random = new Random();

            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public class YemeksepetiResponse
        {
            public bool Result { get; set; }
            public string ErrorMessage { get; set; }
        }
    }
}