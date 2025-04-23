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
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeRepository employeeRepository, IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }
           [HttpGet("id/{id}", Name = "GetEmployeeById")]
            public IActionResult GetEmployeeById(int id)
            {
                var employee = _mapper.Map<EmployeeDto>(_employeeRepository.GetEmployeeById(id));
                //Console.WriteLine(employee.name);
                return Ok(employee);
            }
            [HttpGet("employeeId/{employeeId}", Name = "GetOrderByEmployeeId")]
            public IActionResult GetOrdersByEmployeeId(int employeeId)
            {
                var orders = _mapper.Map<List<OrderDto>>(_employeeRepository.GetOrdersByEmployeeId(employeeId));
                //Console.WriteLine(employee.name);
                return Ok(orders);
            }

    }
}