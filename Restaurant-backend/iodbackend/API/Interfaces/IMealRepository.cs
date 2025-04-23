using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;

namespace API.Interfaces
{
    public interface IMealRepository
    {
        ICollection<Meal> GetMeals();
        Meal GetMealById(int id);
        Meal GetMealByName(string name);

    }
}