using Microsoft.AspNetCore.Mvc;

namespace PM_API.Controllers;

[ApiController]
[Route("credentials")]
public class CredentialsController : ControllerBase
{
    [HttpPost]
    [Route("create")]
    public void CreateCredentials()
    {
        
    }
}