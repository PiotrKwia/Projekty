using API.Data;
using API.Dto;
using API.Interfaces;
using API.Model;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers 
{
    public class MealController : Controller{
    private readonly IMealRepository _mealRepository;
    private readonly IMapper _mapper;

    public MealController(IMealRepository mealRepository, IMapper mapper)
    {
        _mapper = mapper;
        _mealRepository = mealRepository;
    }
    
    [HttpGet]
    public IActionResult GetMeals(){
        var meals = _mapper.Map<List<MealDto>>(_mealRepository.GetMeals());

        if(!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(meals);
    }

    [HttpGet("{mealId:int}", Name = "GetMealById")]
    public IActionResult GetMealById(int mealId){
        
        var meal = _mapper.Map<MealDto>(_mealRepository.GetMealById(mealId));
        if(!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(meal);
    }

    [HttpGet("{mealName}")]
    public IActionResult GetMealByName(string name){
        var meal = _mapper.Map<MealDto>(_mealRepository.GetMealByName(name));

        return Ok(meal);
    }
}
}