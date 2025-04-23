using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;
using API.Dto;
using API.Data;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeliveryController :Controller
    {
        private readonly IDeliveryRepository _deliveryRepository;
        private readonly RestaurantContext _context;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;
        

        public DeliveryController(IMapper mapper, IDeliveryRepository deliveryRepository, RestaurantContext context,IEmployeeRepository employeeRepository)
        {
            _deliveryRepository = deliveryRepository;
            _context = context;
            _mapper = mapper;
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public IActionResult GetDeliveries(){
            var deliveries = _deliveryRepository.GetDeliveries();

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(deliveries);
        }

        [HttpGet("{deliveryId}")]
        public IActionResult GetDelivery(int deliveryId){
            if(!_deliveryRepository.DeliveryExists(deliveryId))
                return NotFound();

            var delivery = _deliveryRepository.GetDelivery(deliveryId);
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(delivery);
        }
        

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateDelivery([FromQuery]int employeeId, [FromBody]DeliveryDto deliveryCreate)
        {
            if (deliveryCreate == null)
                return BadRequest(ModelState);

            
           
                var deliveryMap = _mapper.Map<Delivery>(deliveryCreate);
                deliveryMap.Employee = _employeeRepository.GetEmployeeById(employeeId);

            if (!_deliveryRepository.CreateDelivery(deliveryMap))
            {
                ModelState.AddModelError("", "Something went wrong while savin");
                return StatusCode(500, ModelState);
            }
                                                                                   
            return Ok("Successfully created");
        }
    }

}