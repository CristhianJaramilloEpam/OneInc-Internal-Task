namespace Encoding.Application.Tests;

public class EncodingServiceTests
{
    private readonly Mock<IEncoderStrategy> _encoderStrategyMock;
    private readonly Mock<ILogger<EncodingService>> _loggerMock;
    private readonly EncodingService _sut;

    public EncodingServiceTests()
    {
        _encoderStrategyMock = new Mock<IEncoderStrategy>();
        _loggerMock = new Mock<ILogger<EncodingService>>();
        _sut = new EncodingService(_encoderStrategyMock.Object, _loggerMock.Object);
    }

    [Fact]
    public async Task GetEncodedTextAsync_WithValidInput_ReturnsEncodedCharacters()
    {
        // Arrange
        var input = "Hi";
        var encodedText = "SGk=";
        _encoderStrategyMock.Setup(x => x.EncodeAsync(input)).Returns(encodedText);

        // Act
        var results = new List<EncodeCharResponseDTO>();
        await foreach (var item in _sut.GetEncodedTextAsync(input))
        {
            results.Add(item);
        }

        // Assert
        Assert.Equal(encodedText.Length, results.Count);
        for (int i = 0; i < encodedText.Length; i++)
        {
            Assert.Equal(encodedText[i], results[i].EncodedChar);
        }
    }

    [Fact]
    public async Task GetEncodedTextAsync_WithValidInput_ReturnsCorrectProgress()
    {
        // Arrange
        var input = "Hi";
        var encodedText = "AB";
        _encoderStrategyMock.Setup(x => x.EncodeAsync(input)).Returns(encodedText);

        // Act
        var results = new List<EncodeCharResponseDTO>();
        await foreach (var item in _sut.GetEncodedTextAsync(input))
        {
            results.Add(item);
        }

        // Assert
        Assert.Equal(50, results[0].Progress);
        Assert.Equal(100, results[1].Progress);
    }    
}
