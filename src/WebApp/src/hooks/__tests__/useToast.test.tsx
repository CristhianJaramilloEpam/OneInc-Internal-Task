import { renderHook, act } from "@testing-library/react";
import { useToast } from "../useToast";

describe("useToast", () => {
  it("should return the default initial state", () => {
    // Arrange & Act
    const { result } = renderHook(() => useToast());

    // Assert
    expect(result.current.toast.message).toBe("");
    expect(result.current.toast.show).toBe(false);
    expect(result.current.toast.type).toBe("primary");
  });

  describe("showToast", () => {
    it("should set the message, show to true and the given type", () => {
      // Arrange
      const { result } = renderHook(() => useToast());

      // Act
      act(() => {
        result.current.showToast("Encoding completed successfully!", "success");
      });

      // Assert
      expect(result.current.toast.message).toBe("Encoding completed successfully!");
      expect(result.current.toast.show).toBe(true);
      expect(result.current.toast.type).toBe("success");
    });
  });

  describe("hideToast", () => {
    it("should set show to false", () => {
      // Arrange
      const { result } = renderHook(() => useToast());
      act(() => {
        result.current.showToast("Hello");
      });

      // Act
      act(() => {
        result.current.hideToast();
      });

      // Assert
      expect(result.current.toast.show).toBe(false);
    });
  });
});
