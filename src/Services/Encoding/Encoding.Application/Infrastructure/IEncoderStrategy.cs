namespace Encoding.Application.Infrastructure
{
    public interface IEncoderStrategy
    {
        /// <summary>
        /// Encodes the specified string using a defined encoding scheme.
        /// </summary>
        /// <param name="input">The string to encode.</param>
        /// <returns>The encoded representation of the input string.</returns>
        string EncodeAsync(string input);
    }
}
