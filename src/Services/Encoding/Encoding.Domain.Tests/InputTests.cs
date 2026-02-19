namespace Encoding.Domain.Tests;

public class InputTests
{
    [Fact]
    public void Input_SetText_ReturnsAssignedValue()
    {
        // Arrange
        var expectedText = new char[] { 'H', 'e', 'l', 'l', 'o' };

        // Act
        var input = new Input { Text = expectedText };

        // Assert
        Assert.Equal(expectedText, input.Text);
    }

    [Fact]
    public void Input_SetEmptyCharArray_ReturnsEmptyArray()
    {
        // Arrange
        var expectedText = Array.Empty<char>();

        // Act
        var input = new Input { Text = expectedText };

        // Assert
        Assert.Empty(input.Text);
    }
}
