namespace Encoding.Infrastructure.Enconding
{
    public class Base64Strategy : IEncoderStrategy
    {
        /// <inheritdoc/>
        public string EncodeAsync(string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                throw new ArgumentException("Input cannot be null or empty.", nameof(input));
            }

            var bytes = System.Text.Encoding.UTF8.GetBytes(input);
            return System.Convert.ToBase64String(bytes);
        }
    }
}