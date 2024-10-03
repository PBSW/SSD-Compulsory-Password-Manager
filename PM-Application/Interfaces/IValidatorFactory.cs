namespace PM_Application.Interfaces;

public interface IValidatorFactory
{
    Task ValidateAsync<T>(T instance);
}