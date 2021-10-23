FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY RollDiceWithX.csproj .
RUN dotnet restore "RollDiceWithX.csproj"
COPY . .
RUN dotnet build "RollDiceWithX.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RollDiceWithX.csproj" -c Release -o /app/publish
COPY /static /app/publish/static

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RollDiceWithX.dll"]
