﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PM_Application.Interfaces;

namespace PM_Security;

public class JwtProvider : IJwtProvider
{
    private readonly string _secret;
    private readonly string _issuer;
    private readonly string _audience;
    
    public JwtProvider(IOptions<JwtOptions> options)
    {
        _secret = options.Value.Key ?? throw new ArgumentNullException(nameof(options.Value.Key), "JWT secret cannot be null");
        _issuer = options.Value.Issuer ?? throw new ArgumentNullException(nameof(options.Value.Issuer), "JWT issuer cannot be null");
        _audience = options.Value.Audience ?? throw new ArgumentNullException(nameof(options.Value.Audience), "JWT audience cannot be null");
    }
    
    public string GenerateToken(int id, string username, IEnumerable<Claim> additionalClaims = null)
    {
        // Add standard claims (e.g., user ID, username)
        var claims = new List<Claim>
        {
            // Add additional claims if needed
            new Claim(ClaimTypes.NameIdentifier, id.ToString()),
            new Claim(ClaimTypes.Name, username),
        };

        // Add additional claims if provided
        if (additionalClaims != null)
        {
            claims.AddRange(additionalClaims);
        }

        // Specify signing credentials
        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
        var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        // Specify token parameters
        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddHours(8), // Token expiration time, 8 hours in this case
            signingCredentials: signingCredentials
        );

        // Generate token string
        string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

        return tokenValue;
    }
}