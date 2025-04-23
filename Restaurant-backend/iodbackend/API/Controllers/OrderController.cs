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
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IMealRepository _mealRepository;
        private readonly IMapper _mapper;
        private readonly RestaurantContext _context;

        public OrderController(IOrderRepository orderRepository,IEmployeeRepository employeeRepository, IVehicleRepository vehicleRepository,IMealRepository mealRepository, IMapper mapper,RestaurantContext context)
        {
            _orderRepository = orderRepository;
            _employeeRepository = employeeRepository;
            _mealRepository = mealRepository;
            _vehicleRepository = vehicleRepository;
            _context = context;
            _mapper = mapper;
        }
           [HttpGet("id/{id}", Name = "GetOrderById")]
            public IActionResult GetOrderById(int id)
            {
                var order = _mapper.Map<OrderDto>(_orderRepository.GetOrderById(id));
                //Console.WriteLine(order.name);
                return Ok(order);
            }
            [HttpGet("client/{client}", Name = "GetOrderByClient")]
            public IActionResult GetOrdersByClient(int client)
            {
                var orders = _mapper.Map<List<OrderDto>>(_orderRepository.GetOrdersByClient(client));
                //Console.WriteLine(order.name);
                return Ok(orders);
            }
            

                    [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateOrder([FromQuery]int employeeId, int mealId, int vehicleId, [FromBody]OrderDto orderCreate)
        {
            if (orderCreate == null)
                return BadRequest(ModelState);

            
           
                var orderMap = _mapper.Map<Order>(orderCreate);
                orderMap.Employee = _employeeRepository.GetEmployeeById(employeeId);
                orderMap.Meal = _mealRepository.GetMealById(mealId);
                orderMap.Vehicle = _vehicleRepository.GetVehicleById(vehicleId);
            if (!_orderRepository.CreateOrder(orderMap))
            {
                ModelState.AddModelError("", "Something went wrong while savin");
                return StatusCode(500, ModelState);
            }
                                                                                   
            return Ok("Successfully created");
        }
    }
}