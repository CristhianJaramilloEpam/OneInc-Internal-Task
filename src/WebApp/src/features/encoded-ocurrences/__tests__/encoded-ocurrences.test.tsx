import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { encodeSlice, EncodeState } from "../../../context/encode-slice";
import { EncodedOcurrences } from "../encoded-ocurrences";

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
      <EncodedOcurrences />
    </Provider>
  );

describe("EncodedOcurrences", () => {
  it("should not render the table when encodedChars is empty", () => {
    // Arrange & Act
    const { container } = renderWithStore({ encodedChars: [] });

    // Assert
    expect(
      container.querySelector(".streaming-text__encoded-table")
    ).not.toBeInTheDocument();
  });

  it("should render a table with a row per unique character", () => {
    // Arrange & Act
    renderWithStore({ encodedChars: ["A", "B", "A"] });

    // Assert
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("should render the accordion toggle button", () => {
    // Arrange & Act
    renderWithStore({ encodedChars: ["Z"] });

    // Assert
    expect(screen.getByText("Number of ocurrences")).toBeInTheDocument();
  });
});
