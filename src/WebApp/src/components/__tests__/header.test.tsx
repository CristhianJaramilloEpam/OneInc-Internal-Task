import { render, screen } from "@testing-library/react";
import { Header } from "../header";

describe("Header", () => {
  it("should render the Streaming Text heading", () => {
    // Arrange & Act
    render(<Header title="Test"/>);

    // Assert
    expect(
      screen.getByRole("heading", { name: /Test/i })
    ).toBeInTheDocument();
  });
});
