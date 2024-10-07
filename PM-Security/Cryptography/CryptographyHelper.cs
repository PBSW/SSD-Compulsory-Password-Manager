using System.Security.Cryptography;
using Microsoft.Extensions.Options;
using PM_Application.Interfaces;

namespace PM_Security.Cryptography;

public class CryptographyHelper(IOptions<CryptographyOptions> options) : ICryptographyHelper
{
    public (string Cipher, string IV) Encrypt(string plainText)
    {
        using Aes aes = Aes.Create();
        aes.Key = Convert.FromBase64String(options.Value.Key); // Use the same key for all encryptions
        aes.GenerateIV(); // Generate a new IV for this encryption

        ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

        using MemoryStream ms = new MemoryStream();
        
        using CryptoStream cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write);
        
        using (StreamWriter sw = new StreamWriter(cs))
        {
            sw.Write(plainText);
        }
        // Return both the encrypted password and the IV
        return (Convert.ToBase64String(ms.ToArray()), Convert.ToBase64String(aes.IV));
    }

    public string DecryptWithIV(string cipher, string iv)
    {
        using Aes aes = Aes.Create();
        aes.Key = Convert.FromBase64String(options.Value.Key); // Use the same key for all decryptions
        aes.IV = Convert.FromBase64String(iv); // Use the stored IV for decryption
        
        ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

        using MemoryStream ms = new MemoryStream(Convert.FromBase64String(cipher));
        using CryptoStream cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read);
        
        using (StreamReader sr = new StreamReader(cs))
        {
            return sr.ReadToEnd();
        }
    }
}