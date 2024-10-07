using System.Text;
using Konscious.Security.Cryptography;
using PM_Application.Interfaces;

namespace PM_Security.Hasher;

public class PasswordHasher : IPasswordHasher
{
    public string Hash(string password, string salt)
    {
        byte[] saltByte = Encoding.UTF8.GetBytes("Key" + salt);

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