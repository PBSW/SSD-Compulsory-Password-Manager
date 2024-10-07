using FluentValidation;
using Microsoft.EntityFrameworkCore;
using PM_Infrastructure;
using PM_Security;
using PM_Security.Hasher;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddValidatorsFromAssemblies(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//Add IOption<CryptographyOptions> to the DI container
builder.Services.Configure<CryptographyOptions>(builder.Configuration.GetSection("Cryptography"));

builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("JwtBearer"));
builder.Services.Configure<HashOptions>(builder.Configuration.GetSection("Hash"));


PM_Application.DependencyResolver.Resolver.RegisterApplicationLayer(builder.Services);
PM_Infrastructure.DependencyResolver.Resolver.RegisterRepositoryLayer(builder.Services);
PM_Security.DependencyResolver.Resolver.RegisterRepositoryLayer(builder.Services);

builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.UseSqlite("Data Source=db.db");
    options.EnableSensitiveDataLogging();
    options.EnableDetailedErrors();
});

// Remember to put builder things before this, stupid.
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.UseHttpsRedirection();

app.Run();