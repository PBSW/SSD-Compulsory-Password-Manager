using Microsoft.AspNetCore.Mvc;
using PM_Application.DTOs.Create;
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
    public async Task<IActionResult> CreateCredentials([FromBody] ServiceCredentialsCreate create)
    {
        try
        {
            return Ok(await _credentialsService.Create(create));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("get")]
    public async Task<IActionResult> GetCredentials()
    {
        try
        {
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}