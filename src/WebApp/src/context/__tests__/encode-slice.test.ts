import {
  encodeSlice,
  setNewEncodedChar,
  setIsStreaming,
  resetEncodedChars,
  EncodeState,
} from "../encode-slice";

const { reducer } = encodeSlice;

const initialState: EncodeState = {
  encodedChars: [],
  progress: 0,
  isStreaming: false,
};

describe("encodeSlice", () => {
  describe("setNewEncodedChar", () => {
    it("should push the encoded char and update progress", () => {
      // Arrange
      const state = { ...initialState };
      const payload = { encodedChar: "SGVsbG8=", progress: 50 };

      // Act
      const newState = reducer(state, setNewEncodedChar(payload));

      // Assert
      expect(newState.encodedChars).toContain("SGVsbG8=");
      expect(newState.progress).toBe(50);
      expect(newState.isStreaming).toBe(true);
    });
  });

  describe("setIsStreaming", () => {
    it("should update isStreaming with the given value", () => {
      // Arrange
      const state = { ...initialState };

      // Act
      const newState = reducer(state, setIsStreaming(true));

      // Assert
      expect(newState.isStreaming).toBe(true);
    });
  });

  describe("resetEncodedChars", () => {
    it("should reset state back to its initial values", () => {
      // Arrange
      const state: EncodeState = {
        encodedChars: ["SGVsbG8=", "dGVzdA=="],
        progress: 75,
        isStreaming: true,
      };

      // Act
      const newState = reducer(state, resetEncodedChars());

      // Assert
      expect(newState.encodedChars).toEqual([]);
      expect(newState.progress).toBe(0);
      expect(newState.isStreaming).toBe(false);
    });
  });
});
