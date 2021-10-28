using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Dicebag;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RollDiceWithX.SignalR;

namespace RollDiceWithX.Database
{
    public class RoomDatabase : DbContext
    {
        public DbSet<Room> Rooms { get; set; }
        private string DbPath { get; set; }

        public RoomDatabase()
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

    public class Room
    {
        public int Id { get; set; }
        public string RoomName { get; set; }
        public string HashedPassword { get; set; }
        public string Salt { get; set; }
        public List<UserRoll> UserRolls { get; set; }
    }
}