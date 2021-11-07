FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY RollDiceWithX.csproj .
RUN dotnet restore "RollDiceWithX.csproj"
COPY . .

RUN apt-get update && \
apt-get install -y wget && \
apt-get install -y gnupg2 && \
wget -qO- https://deb.nodesource.com/setup_12.x | bash - && \
apt-get install -y build-essential nodejs

RUN dotnet build "RollDiceWithX.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RollDiceWithX.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RollDiceWithX.dll"]
