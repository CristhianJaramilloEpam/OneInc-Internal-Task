namespace Encoding.Infrastructure.Tests;

public class Base64StrategyTests
{
    private readonly Base64Strategy _sut;

    public Base64StrategyTests()
    {
        _sut = new Base64Strategy();
    }

    [Fact]
    public void EncodeAsync_WithValidInput_ReturnsBase64EncodedString()
    {
        // Arrange
        var input = "Hello";
        var expected = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(input));

        // Act
        var result = _sut.EncodeAsync(input);

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public void EncodeAsync_WithSingleCharacter_ReturnsBase64EncodedString()
    {
        // Arrange
        var input = "A";
        var expected = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(input));

        // Act
        var result = _sut.EncodeAsync(input);

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public void EncodeAsync_WithSpecialCharacters_ReturnsBase64EncodedString()
    {
        // Arrange
        var input = "Hello World! @#$%";
        var expected = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(input));

        // Act
        var result = _sut.EncodeAsync(input);

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public void EncodeAsync_WithNumericInput_ReturnsBase64EncodedString()
    {
        // Arrange
        var input = "12345";
        var expected = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(input));

        // Act
        var result = _sut.EncodeAsync(input);

        // Assert
        Assert.Equal(expected, result);
    }

    [Fact]
    public void EncodeAsync_ReturnsDecodableBase64String()
    {
        // Arrange
        var input = "Hello";

        // Act
        var result = _sut.EncodeAsync(input);

        // Assert
        var decoded = System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(result));
        Assert.Equal(input, decoded);
    }

    [Fact]
    public void EncodeAsync_WithNullInput_ThrowsArgumentException()
    {
        // Arrange
        string input = null!;

        // Act & Assert
        Assert.Throws<ArgumentException>(() => _sut.EncodeAsync(input));
    }

    [Fact]
    public void EncodeAsync_WithEmptyInput_ThrowsArgumentException()
    {
        // Arrange
        var input = string.Empty;

        // Act & Assert
        Assert.Throws<ArgumentException>(() => _sut.EncodeAsync(input));
    }
}
