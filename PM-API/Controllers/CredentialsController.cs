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
    public async Task<IActionResult> CreateCredentials([FromBody] CredentialsCreate create)
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
    public async Task<IActionResult> GetCredentialsById([FromBody] CredentialsRequest request)
    {
        try
        {
            return Ok(_credentialsService.GetById(request));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("getAllByUser")]
    public async Task<IActionResult> GetAllByUser([FromBody] int user)
    {
        try
        {
            return Ok(_credentialsService.GetAllByUser(user));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] CredentialsRequest request)
    {
        try
        {
            return Ok(_credentialsService.Update(request));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete([FromBody] CredentialsRequest delete)
    {
        try
        {
            return Ok(_credentialsService.Delete(delete));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}