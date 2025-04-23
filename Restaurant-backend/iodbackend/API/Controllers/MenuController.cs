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
    [ApiController]
    [Route("api/[controller]")]
    public class MenuController : Controller
    {
        private readonly IMenuRepository _menuRepository;
        private readonly IMapper _mapper;

        public MenuController(IMenuRepository menuRepository, IMapper mapper)
        {
            _mapper = mapper;
            _menuRepository = menuRepository;
        }

        [HttpGet]
        public IActionResult GetMenus(){
            var menus = _mapper.Map<List<MenuDto>>(_menuRepository.GetMenus());
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(menus);
        }

        [HttpGet("{menuId}")]
        public IActionResult GetMenu(int menuId){
            if(!_menuRepository.MenuExists(menuId))
                return NotFound();

            var menu = _mapper.Map<MenuDto>(_menuRepository.GetMenu(menuId));

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(menu);
        }

        [HttpGet("{menuId}/menu")]
        public IActionResult GetMealsByMenu(int menuId){
            if(!_menuRepository.MenuExists(menuId))
                return NotFound();

            var meals = _mapper.Map<List<MealDto>>(_menuRepository.GetMealsByMenu(menuId));

            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(meals);
        }
    }
}