namespace Encoding.Application
{
    public class EncodingService(IEncoderStrategy encoderStrategy, ILogger<EncodingService> logger) : IEncodingService
    {
        private const int DelayMaxSeconds = 5;
        private const int DelayMinSeconds = 1;
        private const int MillisecondsInSecond = 1000;
        private readonly IEncoderStrategy _encoderStrategy = encoderStrategy;
        private readonly ILogger<EncodingService> _logger = logger;

        public async IAsyncEnumerable<EncodeCharResponseDTO> GetEncodedTextAsync(string input, [EnumeratorCancellation] CancellationToken cancellationToken = default)
        {
            var encodedInput = _encoderStrategy.EncodeAsync(input);
            var chars = encodedInput.ToCharArray();
            var index = 0;

            _logger.LogInformation("Encoded input: {EncodedInput}", encodedInput);

            foreach (char c in chars)
            {
                index++;
                Random random = new Random();
                await Task.Delay(GetDelaySeconds(), cancellationToken);
                yield return new EncodeCharResponseDTO() { EncodedChar = c, Progress = GetProgress(chars.Length, index) };
            }
        }

        private int GetDelaySeconds() => new Random().Next(DelayMinSeconds, DelayMaxSeconds) * MillisecondsInSecond;

        private int GetProgress(int lenght, int index) => index * 100 / lenght;
    }
}