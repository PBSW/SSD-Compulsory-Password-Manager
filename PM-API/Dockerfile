FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["PM-API/PM-API.csproj", "PM-API/"]
COPY ["PM-Application/PM-Application.csproj", "PM-Application/"]
COPY ["PM-Domain/PM-Domain.csproj", "PM-Domain/"]
COPY ["PM-Infrastructure/PM-Infrastructure.csproj", "PM-Infrastructure/"]
COPY ["PM-Security/PM-Security.csproj", "PM-Security/"]
RUN dotnet restore "PM-API/PM-API.csproj"
COPY . .
WORKDIR "/src/PM-API"
RUN dotnet build "PM-API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "PM-API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PM-API.dll"]
