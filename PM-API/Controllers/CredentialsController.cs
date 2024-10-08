using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PM_Application.DTOs.Create;
using PM_Application.DTOs.Request;
using PM_Application.DTOs.Update;
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
    public async Task<IActionResult> GetCredentialsById([FromRoute] int request)
    {
        try
        {
            return Ok(await _credentialsService.GetById(request));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpGet]
    [Route("getAllByUser")]
    public async Task<IActionResult> GetAllByUser([FromRoute] int user)
    {
        try
        {
            return Ok(await _credentialsService.GetAllByUser(user));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] CredentialsUpdate update)
    {
        try
        {
            return Ok(await _credentialsService.Update(update));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpDelete]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        try
        {
            return Ok(await _credentialsService.Delete(new CredentialsRequest { Id = id }));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}