using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class Calendar
    {
        [Key]
        public int calendarId { get; set; }
        public int employeeId { get; set; }
        public DateTime date {get; set;}
        public Employee Employee{get; set;}
        
    }
}