import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { encodeSlice, EncodeState } from "../../../context/encode-slice";
import { EncodedText } from "../encoded-text";

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
      <EncodedText />
    </Provider>
  );

describe("EncodedText", () => {
  it("should not render the results section when encodedChars is empty", () => {
    // Arrange & Act
    const { container } = renderWithStore({ encodedChars: [] });

    // Assert
    expect(
      container.querySelector(".streaming-text__encoded-results")
    ).not.toBeInTheDocument();
  });

  it("should render the encoded chars joined together", () => {
    // Arrange & Act
    renderWithStore({ encodedChars: ["SGVs", "bG8="] });

    // Assert
    expect(screen.getByText("SGVsbG8=")).toBeInTheDocument();
  });

  it("should render the Encoded Text heading when chars are present", () => {
    // Arrange & Act
    renderWithStore({ encodedChars: ["abc"] });

    // Assert
    expect(screen.getByText("Encoded Text")).toBeInTheDocument();
  });
});
