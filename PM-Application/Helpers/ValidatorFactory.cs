using FluentValidation;
using IValidatorFactory = PM_Application.Interfaces.IValidatorFactory;

namespace PM_Application.Helpers;

public class ValidatorFactory : IValidatorFactory
{
    private readonly IServiceProvider _serviceProvider;

    public ValidatorFactory(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task ValidateAsync<T>(T instance)
    {
        var validatorType = typeof(IValidator<T>);
        var validator = (IValidator<T>)_serviceProvider.GetService(validatorType);
        
        if (validator != null)
        {
            var result = await validator.ValidateAsync(instance);

            if (!result.IsValid)
            {
                throw new ValidationException(result.ToString());
            }
        }
        else
        {
            throw new InvalidOperationException($"No validator found for {typeof(T).Name}");
        }
    }
}