import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { encodeSlice, EncodeState } from "../../../context/encode-slice";
import { InputText } from "../input-text";

jest.mock("../../../context/api/encode-api", () => {
  const actual = jest.requireActual("../../../context/api/encode-api");
  return {
    ...actual,
    useEncodeTextMutation: jest.fn(),
  };
});

import { useEncodeTextMutation } from "../../../context/api/encode-api";

const mockEncodeText = jest.fn().mockReturnValue({ abort: jest.fn() });

const createTestStore = (encodeState: Partial<EncodeState> = {}) =>
  configureStore({
    reducer: { encode: encodeSlice.reducer },
    preloadedState: {
      encode: { encodedChars: [], progress: 0, isStreaming: false, ...encodeState },
    },
  });

const renderWithStore = (encodeState: Partial<EncodeState> = {}) =>
  render(
    <Provider store={createTestStore(encodeState)}>
      <InputText />
    </Provider>
  );

beforeEach(() => {
  jest.clearAllMocks();
  (useEncodeTextMutation as jest.Mock).mockReturnValue([
    mockEncodeText,
    { isLoading: false, isSuccess: false },
  ]);
  (window as any).bootstrap = {
    Toast: jest.fn().mockImplementation(() => ({
      show: jest.fn(),
      hide: jest.fn(),
      dispose: jest.fn(),
    })),
  };
});

afterEach(() => {
  delete (window as any).bootstrap;
});

describe("InputText", () => {
  describe("when not streaming", () => {
    it("should render the text input and Process button", () => {
      // Arrange & Act
      renderWithStore({ isStreaming: false });

      // Assert
      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /process/i })).toBeInTheDocument();
    });

    it("should call encodeText with the entered text on form submit", async () => {
      // Arrange
      renderWithStore({ isStreaming: false });
      fireEvent.change(screen.getByPlaceholderText("Enter text"), {
        target: { value: "hello" },
      });

      // Act
      fireEvent.click(screen.getByRole("button", { name: /process/i }));

      // Assert
      await waitFor(() => {
        expect(mockEncodeText).toHaveBeenCalledWith({ text: "hello" });
      });
    });
  });

  describe("when streaming", () => {
    it("should render the ProgressBar and Cancel button", () => {
      // Arrange & Act
      renderWithStore({ isStreaming: true, progress: 50 });

      // Assert
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    });
  });
});
