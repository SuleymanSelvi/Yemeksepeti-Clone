﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YemekSepeti.Models.DTO
{
    public abstract class BaseDTO
    {
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
    }  
}
