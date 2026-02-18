namespace Encoding.Application
{
    public interface IEncodingService
    {
        /// <summary>
        /// Encodes the specified string using a defined encoding scheme.
        /// </summary>
        /// <param name="input">The string to encode.</param>
        /// <returns>The encoded representation of the input string.</returns>
        IAsyncEnumerable<EncodeCharResponseDTO> GetEncodedTextAsync(string input, CancellationToken cancellationToken = default);
    }
}
