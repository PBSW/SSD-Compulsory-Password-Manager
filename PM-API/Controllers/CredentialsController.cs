using System.Security.Claims;
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
    
    [Authorize]
    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> CreateCredentials([FromBody] CredentialsCreate create)
    {
        try
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized("User is not authenticated.");
            }
            
            // Convert userId to an integer if necessary
            var parsedUserId = int.Parse(userId);
            
            return Ok(await _credentialsService.Create(create, parsedUserId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [Authorize(Policy = "OwnDataPolicy")]
    [HttpGet]
    [Route("get/{request}")]
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
    
    [Authorize]
    [HttpGet]
    [Route("getAllByUser")]
    public async Task<IActionResult> GetAllByUser()
    {
        try
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized("User is not authenticated.");
            }
            
            // Convert userId to an integer if necessary
            var parsedUserId = int.Parse(userId);
            
            return Ok(await _credentialsService.GetAllByUser(parsedUserId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [Authorize(Policy = "OwnDataPolicy")]
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
    
    [Authorize(Policy = "OwnDataPolicy")]
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