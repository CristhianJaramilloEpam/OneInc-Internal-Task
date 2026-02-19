namespace Encoding.WebApi.Tests.Controllers;

public class EncodeControllerTests
{
    private readonly Mock<IEncodingService> _encodingServiceMock;
    private readonly Mock<ILogger<EncodeController>> _loggerMock;
    private readonly EncodeController _sut;

    public EncodeControllerTests()
    {
        _encodingServiceMock = new Mock<IEncodingService>();
        _loggerMock = new Mock<ILogger<EncodeController>>();
        _sut = new EncodeController(_encodingServiceMock.Object, _loggerMock.Object);
    }

    [Fact]
    public async Task Post_WithValidInput_ReturnsEncodedCharacters()
    {
        // Arrange
        var input = "Hi";
        var expectedResponses = new List<EncodeCharResponseDTO>
        {
            new() { EncodedChar = 'S', Progress = 50 },
            new() { EncodedChar = 'G', Progress = 100 }
        };
        _encodingServiceMock
            .Setup(x => x.GetEncodedTextAsync(input, It.IsAny<CancellationToken>()))
            .Returns(ToAsyncEnumerable(expectedResponses));

        // Act
        var results = new List<EncodeCharResponseDTO>();
        await foreach (var item in _sut.Post(input, CancellationToken.None))
        {
            results.Add(item);
        }

        // Assert
        Assert.Equal(expectedResponses.Count, results.Count);
        Assert.Equal('S', results[0].EncodedChar);
        Assert.Equal('G', results[1].EncodedChar);
    }

    [Fact]
    public async Task Post_WithValidInput_ReturnsCorrectProgress()
    {
        // Arrange
        var input = "Hi";
        var expectedResponses = new List<EncodeCharResponseDTO>
        {
            new() { EncodedChar = 'S', Progress = 50 },
            new() { EncodedChar = 'G', Progress = 100 }
        };
        _encodingServiceMock
            .Setup(x => x.GetEncodedTextAsync(input, It.IsAny<CancellationToken>()))
            .Returns(ToAsyncEnumerable(expectedResponses));

        // Act
        var results = new List<EncodeCharResponseDTO>();
        await foreach (var item in _sut.Post(input, CancellationToken.None))
        {
            results.Add(item);
        }

        // Assert
        Assert.Equal(50, results[0].Progress);
        Assert.Equal(100, results[1].Progress);
    }

    [Fact]
    public async Task Post_WithValidInput_ReturnsResultsInOrder()
    {
        // Arrange
        var input = "ABC";
        var expectedResponses = new List<EncodeCharResponseDTO>
        {
            new() { EncodedChar = 'Q', Progress = 25 },
            new() { EncodedChar = 'U', Progress = 50 },
            new() { EncodedChar = 'J', Progress = 75 },
            new() { EncodedChar = 'D', Progress = 100 }
        };
        _encodingServiceMock
            .Setup(x => x.GetEncodedTextAsync(input, It.IsAny<CancellationToken>()))
            .Returns(ToAsyncEnumerable(expectedResponses));

        // Act
        var results = new List<EncodeCharResponseDTO>();
        await foreach (var item in _sut.Post(input, CancellationToken.None))
        {
            results.Add(item);
        }

        // Assert
        for (int i = 0; i < expectedResponses.Count; i++)
        {
            Assert.Equal(expectedResponses[i].EncodedChar, results[i].EncodedChar);
            Assert.Equal(expectedResponses[i].Progress, results[i].Progress);
        }
    }

    [Fact]
    public async Task Post_WithEmptyServiceResponse_ReturnsNoResults()
    {
        // Arrange
        var input = "";
        _encodingServiceMock
            .Setup(x => x.GetEncodedTextAsync(input, It.IsAny<CancellationToken>()))
            .Returns(ToAsyncEnumerable(new List<EncodeCharResponseDTO>()));

        // Act
        var results = new List<EncodeCharResponseDTO>();
        await foreach (var item in _sut.Post(input, CancellationToken.None))
        {
            results.Add(item);
        }

        // Assert
        Assert.Empty(results);
    }

    [Fact]
    public async Task Post_WithSingleCharacterResponse_ReturnsSingleResult()
    {
        // Arrange
        var input = "A";
        var expectedResponses = new List<EncodeCharResponseDTO>
        {
            new() { EncodedChar = 'Q', Progress = 100 }
        };
        _encodingServiceMock
            .Setup(x => x.GetEncodedTextAsync(input, It.IsAny<CancellationToken>()))
            .Returns(ToAsyncEnumerable(expectedResponses));

        // Act
        var results = new List<EncodeCharResponseDTO>();
        await foreach (var item in _sut.Post(input, CancellationToken.None))
        {
            results.Add(item);
        }

        // Assert
        Assert.Single(results);
        Assert.Equal('Q', results[0].EncodedChar);
        Assert.Equal(100, results[0].Progress);
    }

    [Fact]
    public async Task Post_WithMultipleCharacters_ReturnsAllEncodedCharacters()
    {
        // Arrange
        var input = "Test";
        var expectedResponses = new List<EncodeCharResponseDTO>
        {
            new() { EncodedChar = 'V', Progress = 16 },
            new() { EncodedChar = 'G', Progress = 33 },
            new() { EncodedChar = 'V', Progress = 50 },
            new() { EncodedChar = 'z', Progress = 66 },
            new() { EncodedChar = 'd', Progress = 83 },
            new() { EncodedChar = '=', Progress = 100 }
        };
        _encodingServiceMock
            .Setup(x => x.GetEncodedTextAsync(input, It.IsAny<CancellationToken>()))
            .Returns(ToAsyncEnumerable(expectedResponses));

        // Act
        var results = new List<EncodeCharResponseDTO>();
        await foreach (var item in _sut.Post(input, CancellationToken.None))
        {
            results.Add(item);
        }

        // Assert
        Assert.Equal(expectedResponses.Count, results.Count);
    }

    private static async IAsyncEnumerable<T> ToAsyncEnumerable<T>(IEnumerable<T> source)
    {
        foreach (var item in source)
        {
            yield return item;
        }
        await Task.CompletedTask;
    }
}
