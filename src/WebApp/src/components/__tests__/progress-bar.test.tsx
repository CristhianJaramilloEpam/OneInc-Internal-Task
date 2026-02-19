import { render, screen } from "@testing-library/react";
import { ProgressBar } from "../progress-bar";

describe("ProgressBar", () => {
  it("should render a progressbar with the correct aria-valuenow", () => {
    // Arrange & Act
    render(<ProgressBar progress={50} />);

    // Assert
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "50"
    );
  });

  it("should display the progress value as a percentage", () => {
    // Arrange & Act
    render(<ProgressBar progress={75} />);

    // Assert
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("should apply the correct width style to the inner bar", () => {
    // Arrange & Act
    const { container } = render(<ProgressBar progress={30} />);

    // Assert
    expect(container.querySelector(".progress-bar")).toHaveStyle("width: 30%");
  });
});
