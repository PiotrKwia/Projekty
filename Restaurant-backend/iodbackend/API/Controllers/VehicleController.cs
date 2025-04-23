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
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IMapper _mapper;

        public VehicleController(IVehicleRepository vehicleRepository, IMapper mapper)
        {
            _vehicleRepository = vehicleRepository;
            _mapper = mapper;
        }
           [HttpGet("id/{id}", Name = "GetVehicleById")]
            public IActionResult GetVehicleById(int id)
            {
                var vehicle = _mapper.Map<VehicleDto>(_vehicleRepository.GetVehicleById(id));
                //Console.WriteLine(order.name);
                return Ok(vehicle);
            }
    }
}