namespace Encoding.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EncodeController(IEncodingService encodingService, ILogger<EncodeController> logger) : ControllerBase
    {
        private readonly IEncodingService _encondingService = encodingService;
        private readonly ILogger<EncodeController> _logger = logger;

        public async IAsyncEnumerable<EncodeCharResponseDTO> Post(string input, [EnumeratorCancellation] CancellationToken cancellationToken)
        {
            _logger.LogInformation("Received input for encoding: {Input}", input);
            await foreach (var c in _encondingService.GetEncodedTextAsync(input).WithCancellation(cancellationToken))
            {
                yield return c;
            }
        }
    }
}