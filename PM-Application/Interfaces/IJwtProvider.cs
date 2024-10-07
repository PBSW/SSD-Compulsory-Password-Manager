using System.Security.Claims;

namespace PM_Application.Interfaces;

public interface IJwtProvider
{
    public string GenerateToken(int id, string username, IEnumerable<Claim> additionalClaims = null);
}