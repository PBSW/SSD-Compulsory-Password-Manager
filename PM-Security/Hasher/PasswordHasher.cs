using System.Text;
using Konscious.Security.Cryptography;
using Microsoft.Extensions.Options;
using PM_Application.Interfaces;

namespace PM_Security.Hasher;

public class PasswordHasher : IPasswordHasher
{
    private readonly string _secret;

    public PasswordHasher(IOptions<HashOptions> options)
    {
        _secret = options.Value.Key ?? throw new ArgumentNullException(nameof(options.Value.Key), "Hasher secret cannot be null");
    }
    
    public string Hash(string password, string salt)
    {
        byte[] saltByte = Encoding.UTF8.GetBytes(_secret + salt);

        var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
        {
            Salt = saltByte,
            DegreeOfParallelism = 4,
            MemorySize = 65536,
            Iterations = 4
        };
        byte[] hash = argon2.GetBytes(32);
        
        return Convert.ToBase64String(hash);
    }
}