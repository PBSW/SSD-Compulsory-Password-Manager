using PM_Application.Interfaces;
using VaultSharp;
using VaultSharp.V1.AuthMethods.Token;
using VaultSharp.V1.Commons;

namespace PM_Infrastructure;

public class VaultService : ISecretService
{
    private readonly string address = "http://vault:8200";
    
    private readonly IVaultClient _vaultClient;

    public VaultService()
    {
        var authMethod = new TokenAuthMethodInfo("root");
        var vaultClientSettings = new VaultClientSettings(address, authMethod);
        _vaultClient = new VaultClient(vaultClientSettings);
    }
    
    public async Task<string> GetSecretAsync(string path, string key)
    {
        Secret<SecretData> secret = await _vaultClient.V1.Secrets.KeyValue.V2.ReadSecretAsync(path);
        return secret.Data.Data.ContainsKey(key) ? secret.Data.Data[key].ToString() : null;
    }
}