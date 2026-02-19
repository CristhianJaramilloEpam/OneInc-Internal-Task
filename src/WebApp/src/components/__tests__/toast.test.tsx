import { render, screen } from "@testing-library/react";
import { Toast } from "../toast";

const mockToastInstance = {
  show: jest.fn(),
  hide: jest.fn(),
  dispose: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  (window as any).bootstrap = {
    Toast: jest.fn().mockImplementation(() => mockToastInstance),
  };
});

afterEach(() => {
  delete (window as any).bootstrap;
});

describe("Toast", () => {
  it("should render the message text", () => {
    // Arrange & Act
    render(<Toast message="Encoding completed" show={false} onHide={jest.fn()} />);

    // Assert
    expect(screen.getByText("Encoding completed")).toBeInTheDocument();
  });

  it("should apply the correct background type class", () => {
    // Arrange & Act
    const { container } = render(
      <Toast message="Encoding stopped" show={false} type="warning" onHide={jest.fn()} />
    );

    // Assert
    expect(container.querySelector(".toast")).toHaveClass("bg-warning");
  });

  it("should call show on the bootstrap instance when show is true", () => {
    // Arrange & Act
    render(<Toast message="Hello" show={true} onHide={jest.fn()} />);

    // Assert
    expect(mockToastInstance.show).toHaveBeenCalled();
  });
});
