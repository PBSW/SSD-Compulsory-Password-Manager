namespace PM_Domain;

public class ServiceCredentials
{
    public int Id { get; set; }
    public string ServiceName { get; set; }
    public string ServiceUsername { get; set; }
    public string ServicePassword { get; set; }

    public int UserId { get; set; }
}