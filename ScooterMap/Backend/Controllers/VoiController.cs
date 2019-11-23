using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net.Http;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VoiController : ControllerBase
    {
       
        private readonly ILogger<VoiController> _logger;

        public VoiController(ILogger<VoiController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<string> Get(){
            HttpClient client = new HttpClient();
            return await client.GetAsync("https://api.voiapp.io/v1/vehicle/status/ready?lat=59.329323&lng=18.068581").Result.Content.ReadAsStringAsync();
        }
    }
}