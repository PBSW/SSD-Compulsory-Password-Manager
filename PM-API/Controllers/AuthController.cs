
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using PM_Application.DTOs.Response;
using PM_Application.Interfaces;
using PM_Application.Interfaces.Services;
using RegisterRequest = PM_Application.DTOs.Request.RegisterRequest;

namespace PM_API.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;

    public AuthController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }
    
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        try
        {
            return Ok(await _authenticationService.Register(request));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}