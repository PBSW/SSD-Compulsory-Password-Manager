namespace PM_Application.Interfaces;

public interface ICryptographyHelper
{
    public (string Cipher, string IV) Encrypt(string plainText);
    public string DecryptWithIV(string cipher, string iv);
}