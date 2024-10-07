using System.Text;
using Konscious.Security.Cryptography;
using PM_Application.Interfaces;

namespace PM_Security.Hasher;

public class PasswordHasher : IPasswordHasher
{
    public string Hash(string password, string salt)
    {
        throw new NotImplementedException();
    }
}