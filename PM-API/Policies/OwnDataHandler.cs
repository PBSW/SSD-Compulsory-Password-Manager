using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using PM_Infrastructure;

namespace PM_API.Policies;

public class OwnDataHandler : AuthorizationHandler<OwnDataRequirement>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly DatabaseContext _dbContext; // Inject your DbContext to query the data

    public OwnDataHandler(IHttpContextAccessor httpContextAccessor, DatabaseContext dbContext)
    {
        _httpContextAccessor = httpContextAccessor;
        _dbContext = dbContext;
    }

    protected override async Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        OwnDataRequirement requirement)
    {
        var userId = context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        // Assuming you pass some resource identifier (e.g., id) in the request route or body
        var resourceId = _httpContextAccessor.HttpContext.Request.RouteValues["id"]?.ToString();

        if (string.IsNullOrEmpty(resourceId))
        {
            context.Fail(); // No resource ID provided
            return;
        }

        // Fetch the resource from the database using the resourceId
        var resource = await _dbContext.CredentialsTable.FindAsync(resourceId);
        if (resource == null)
        {
            context.Fail(); // Resource not found
            return;
        }

        //TODO: Temp until ownerId is added to the resource
        context.Succeed(requirement); // User is authorized
        
        /*
        // Compare the user ID from the token with the resource owner ID
        if (resource.OwnerId == userId) // Assuming OwnerId is a property in your resource
        {
            context.Succeed(requirement); // User is authorized
        }
        else
        {
            context.Fail(); // User is not authorized
        } */
    }
}