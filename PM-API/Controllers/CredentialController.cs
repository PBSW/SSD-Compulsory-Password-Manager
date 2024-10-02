using Microsoft.AspNetCore.Mvc;
using PM_Application.DTOs.Request;
using PM_Application.DTOs.Response;
using PM_Application.Interfaces.Services;

namespace PM_API.Controllers;

[ApiController]
[Route("credentials")]
public class CredentialsController : ControllerBase
{
    private readonly ICredentialsService _credentialsService;

    public CredentialsController(ICredentialsService credentialsService)
    {
        _credentialsService = credentialsService;
    }
    
    [HttpPost]
    [Route("create")]
    public CredentialResponse CreateCredentials([FromBody] CredentialRequest request)
    {
        return _credentialsService.Create(request);
    }
}