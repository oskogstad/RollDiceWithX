using System;
using System.Collections.Generic;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RollDiceWithX.Models;

namespace RollDiceWithX.Database
{
    public class RoomDbContext : DbContext
    {
        public DbSet<Room> Rooms { get; set; }
        private string DbPath { get; set; }

        public RoomDbContext()
        {
            const Environment.SpecialFolder folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = $"{path}{System.IO.Path.DirectorySeparatorChar}RollDiceWithX.db";
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var converter = new ValueConverter<List<UserRoll>, string>(
                userRolls => JsonSerializer.Serialize(userRolls, null),
                json => JsonSerializer.Deserialize<List<UserRoll>>(json, null));
            
            modelBuilder.Entity<Room>()
                .Property(room => room.UserRolls)
                .HasConversion(converter);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");
    }
}