using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Model;


namespace API.Repository
{
    public class MealRepository :IMealRepository
    {

        private readonly RestaurantContext _context;
        public MealRepository(RestaurantContext context)
        {
            _context = context;
        }
        public ICollection<Meal> GetMeals(){
            return _context.Meals.OrderBy(p=>p.mealId).ToList();
        }
       public Meal GetMealById(int id){
            return _context.Meals.Where(p=>p.mealId == id).FirstOrDefault();
        }
      public  Meal GetMealByName(string name){
            return _context.Meals.Where(p=>p.name == name).FirstOrDefault();
        }
    }
}