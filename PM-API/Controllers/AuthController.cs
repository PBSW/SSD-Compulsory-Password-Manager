
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PM_Application.DTOs.Create;
using PM_Application.Interfaces.Services;
using LoginRequest = PM_Application.DTOs.Request.LoginRequest;


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
    
    [AllowAnonymous]
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register(RegisterCreate create)
    {
        try
        {
            return Ok(await _authenticationService.Register(create));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [AllowAnonymous]
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login(LoginRequest login)
    {
        try
        {
            return Ok(await _authenticationService.Login(login));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}