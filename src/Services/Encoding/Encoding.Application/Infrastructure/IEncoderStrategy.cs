namespace Encoding.Application.Infrastructure
{
    /// <summary>
    /// Defines a strategy for encoding strings using a specific encoding scheme. This implementation is used for heavy jobs which will call a durable function.
    /// </summary>
    /// <remarks>Implementations of this interface should provide the logic for encoding strings according to
    /// the defined scheme. This allows for flexibility in choosing different encoding strategies as needed.</remarks>
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
