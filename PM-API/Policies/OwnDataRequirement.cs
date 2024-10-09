using Microsoft.AspNetCore.Authorization;

namespace PM_API.Policies;

public class OwnDataRequirement : IAuthorizationRequirement
{
    // Any extra parameters needed for this requirement
}