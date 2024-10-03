using FluentValidation;
using PM_Application.DTOs.Create;
using PM_Application.DTOs.Update;

namespace PM_Application.Validators;

public class ValidatorCredentialsCreate : AbstractValidator<CredentialsCreate>
{
    public ValidatorCredentialsCreate()
    {
        ClassLevelCascadeMode = CascadeMode.Stop;
    }
}

public class ValidatorCredentialsUpdate : AbstractValidator<CredentialsUpdate>
{
    public ValidatorCredentialsUpdate()
    {
        ClassLevelCascadeMode = CascadeMode.Stop;
    }
}

public class ValidatorRegisterCreate : AbstractValidator<RegisterCreate>
{
    public ValidatorRegisterCreate()
    {
        ClassLevelCascadeMode = CascadeMode.Stop;
    }
}