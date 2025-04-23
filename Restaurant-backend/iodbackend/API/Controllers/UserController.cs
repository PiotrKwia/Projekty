using API.Data;
using API.Dto;
using API.Interfaces;
using API.Model;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {



        private readonly IUserModelRepository _userRepository;
        private readonly RestaurantContext _context;
        private readonly IMapper _mapper;
        public UserController(IUserModelRepository userRepository, IMapper mapper, RestaurantContext context){
            _userRepository = userRepository;
            _mapper = mapper;
            _context = context;
        }

      [HttpGet("login/{userName}", Name = "GetUserLogin")]
      public IActionResult GetUserLogin(string userName){
        var user = _mapper.Map<UserLoginDto>(_userRepository.GetUserLoginByUserName(userName));
        return Ok(user);
      }

   [HttpGet("id/{userId}", Name = "GetUserById")]
public IActionResult GetUserById(int userId)
{
    var user = _mapper.Map<UserDto>(_userRepository.GetUserById(userId));
    return Ok(user);
}
   [HttpGet("user/{login}/{password}")]
    public IActionResult GetUserByLoginPassword(string login, string password){
    var user = _mapper.Map<UserDto>(_userRepository.GetUserByUsernameAndPassword(login,password));
    return Ok(user);
    }

    
    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
public IActionResult CreateUser([FromBody] UserDto userModelDtoCreate){
    if(userModelDtoCreate == null)
        return BadRequest(ModelState);
    
        var userMap = _mapper.Map<UserModel>(userModelDtoCreate);
        if(!_userRepository.CreateUser(userMap)){
            ModelState.AddModelError("","Something went wrong");
            return StatusCode(500,  ModelState);
        }
        return Ok("Succesfully created");
    }

    [HttpPost("signIn")]
    public async Task<ActionResult> Register(UserLoginDto userLoginDto){
        var user = new UserModel{
            userName = userLoginDto.login,
            password = userLoginDto.password
        };

        _context.UserModels.Add(user);
        await _context.SaveChangesAsync();
        return NoContent();
    }
    }

}
