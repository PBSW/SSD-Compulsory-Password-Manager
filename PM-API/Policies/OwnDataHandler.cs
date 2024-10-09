using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using PM_Infrastructure;

namespace PM_API.Policies
{
    public class OwnDataHandler : AuthorizationHandler<OwnDataRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DatabaseContext _dbContext;

        public OwnDataHandler(IHttpContextAccessor httpContextAccessor, DatabaseContext dbContext)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override async Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            OwnDataRequirement requirement)
        {
            // Log all claims for debugging
            Console.WriteLine("Listing all claims available in the JWT:");
            foreach (var claim in context.User.Claims)
            {
                Console.WriteLine($"Claim Type: {claim.Type}, Claim Value: {claim.Value}");
            }

            // Get the user ID from the JWT token using the full claim type
            var userIdClaim = context.User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
            
            // Log the raw claim value for debugging
            Console.WriteLine($"Raw User ID Claim Value: {userIdClaim}");

            // Validate userIdClaim and parse it to an integer, handling non-integer values
            if (string.IsNullOrWhiteSpace(userIdClaim))
            {
                Console.WriteLine("Authorization failed: User ID claim is missing or empty.");
                context.Fail();
                return;
            }

            // Attempt to parse the userIdClaim as an integer
            if (!int.TryParse(userIdClaim, out int userId))
            {
                Console.WriteLine($"Authorization failed: Unable to parse User ID '{userIdClaim}' as an integer.");
                context.Fail();
                return;
            }

            // Log the successfully parsed user ID for debugging
            Console.WriteLine($"Successfully parsed User ID from token: {userId}");

            // Attempt to retrieve the resource ID from the request route values
            if (!_httpContextAccessor.HttpContext.Request.RouteValues.TryGetValue("request", out var idValue) || !int.TryParse(idValue?.ToString(), out int resourceId))
            {
                Console.WriteLine("Authorization failed: Invalid or missing resource ID.");
                context.Fail();
                return;
            }

            // Log the retrieved resource ID for debugging
            Console.WriteLine($"Resource ID from request: {resourceId}");

            // Fetch the resource from the database using the resourceId
            var resource = await _dbContext.CredentialsTable.FindAsync(resourceId);
            if (resource == null)
            {
                Console.WriteLine($"Authorization failed: Resource with ID {resourceId} not found.");
                context.Fail();
                return;
            }

            // Log the OwnerId of the resource for debugging
            Console.WriteLine($"Owner ID of the resource: {resource.UserId}");

            // Check if the resource's OwnerId matches the user ID from the token
            if (resource.UserId == userId)
            {
                context.Succeed(requirement); // User is authorized
                Console.WriteLine($"Authorization succeeded: User ID {userId} is the owner of resource ID {resourceId}.");
            }
            else
            {
                Console.WriteLine($"Authorization failed: User ID {userId} is not the owner of resource ID {resourceId}.");
                context.Fail(); // User is not authorized
            }
        }
    }
}
