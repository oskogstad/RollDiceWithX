using System;
using System.Security.Cryptography;
using System.Text;

namespace RollDiceWithX.Utils
{
    public static class PasswordHasher
    {
        private const int Iterations = 25_000;
        private const int hashAndSaltLength = 100;
        private static byte[] GenerateSalt(int length)
        {
            var saltBytes = new byte[length];

            using var provider = new RNGCryptoServiceProvider();
            provider.GetNonZeroBytes(saltBytes);
            return saltBytes;
        }

        public static bool ValidatePassword(string hash, string salt, string password)
        {
            var _hash = GenerateHash(password, salt);

            return hash.Equals(_hash);
        }

        private static string GenerateHash(string password, string salt)
        {
            using var rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, Encoding.UTF8.GetBytes(salt), Iterations);
            return Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(hashAndSaltLength));
        }

        public static (string salt, string hashedPassword) HashPassword(string password)
        {
            var saltBytes = GenerateSalt(hashAndSaltLength);
            var salt = Convert.ToBase64String(saltBytes);

            var hash = GenerateHash(password, salt);
            
            return (salt, hash);
        }
    }
}