using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class Meal
    {
        [Key]
        public int mealId { get; set; }
        public string name {get; set;}
        public string description {get; set;}
        public double mealPrice {get; set;}
        public int menuId { get; set; }
        public ICollection<Order> Orders { get; set; }
        public Menu Menu { get; set; }
    }

}