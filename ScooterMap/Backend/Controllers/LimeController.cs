using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Text.Json;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LimeController : ControllerBase
    {

        private readonly ILogger<LimeController> _logger;

        public LimeController(ILogger<LimeController> logger)
        {
            _logger = logger;
        }

        //https://web-production.lime.bike/api/rider/v1/login?phone=%2b46070-4499610
        [HttpGet]
        [Route("getcode")]
        public async Task<string> GetCode(string phoneNr)
        {
            HttpClient client = new HttpClient();
            _logger.LogInformation("PhoneNr:" + phoneNr);

            var response = await client.GetAsync("https://web-production.lime.bike/api/rider/v1/login?phone=" + phoneNr);
            return await response.Content.ReadAsStringAsync();
        }

        [HttpPost]
        [Route("login")]
        public async Task<string> GetCode(string phoneNr, string code)
        {
            HttpClient client = new HttpClient();
            _logger.LogInformation("PhoneNr:" + phoneNr);
            var dataT = new {phone = phoneNr, login_code = code};
            var dataString = JsonSerializer.Serialize(dataT);
            var data = new StringContent(dataString,Encoding.UTF8   ,"application/json");
            var response = await client.PostAsync("https://web-production.lime.bike/api/rider/v1/login", data);
            return await response.Content.ReadAsStringAsync();
        }

        //token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX3Rva2VuIjoiVFJOQjdCTlVWMlFKNyIsImxvZ2luX2NvdW50IjoyfQ.Kyd9zKec3TH1UH_tPqs_R5XXxsfNRwSgWZfDdfmEh_8
        //set-cookie: _limebike-web_session=T1FzcDNvYWJuWnRLalpYejgvRFZjNHF0S3FQZEowN3Z6Wm5yRjhjV2JMODJOYmszSWNyeEVDUUs4TDJ1R0hoaU54TUd0b05NZUVTNHFKS1l1NTNkcXF5K0F2RGlXUzd5SkRkZjhiaExDRnhCdzU5WHpYVzcrWFRXcjYyMzhlejVoaWlsRGhpSkdsc3BzM1VYa1I4Sm9ZVERFaXhQQnZ5OEw2K1FhcEpPMXo5K3A1V2lrd2VIcWRLbnQxdEVQdVVMNy9obHIzSVpxRnBYQjd2WHFTbU9SOXFnMDk5UXRZUzNGQXptMDBwc3NLT0FYc3kyQzhQTzRnd21EUjRuc3RvdWNzV2JxNDR2OWcvNGRCc3YzV3NjbDN6OFNsdXljdkVCMGU4dVZnSjQ3OERuSk01WWdOSzhXYk4zNml1aXhhVHJ4RnVzbzZuWXBOcUtCb2h5WHpoVE9ETTYxMGRKU2tpMENOTFlsbGlqZWI5NWRZR3dPcmNnSWE0bTlSVDJWeEszbS9icFBRblFMNGdocFZEMVNoYUZQc1VDaEhCWlNua0ZWb3JmcVcxN0JRV251Z2xNS0pVUHAvWGh2T0YwV3l2Nk5SaTlGQmtEK3NnZzlGR1FFYjhabGc9PS0tM0wrYkhBOXl0Nm9lNTJhckR6QmtjQT09--541d82594fca93ba667a13ef29455c232929495a; path=/; secure; HttpOnly


    }
}