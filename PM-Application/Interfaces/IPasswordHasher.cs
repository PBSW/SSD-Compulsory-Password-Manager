namespace PM_Application.Interfaces;

public interface IPasswordHasher
{
    public string Hash(string password, string salt);
}