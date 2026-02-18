import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EncodeCharResponse } from "../../models/encode-char-response";
import {
  resetEncodedChars,
  setIsStreaming,
  setNewEncodedChar,
} from "../encode-slice";

const BASE_URL = process.env.API_URL;

/**
 * RTK Query API for encoding text
 */
export const encodeApi = createApi({
  reducerPath: "encodeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    encodeText: builder.mutation<
      EncodeCharResponse,
      {
        text: string;
      }
    >({
      queryFn: async ({ text }, { dispatch, signal }) => {
        try {
          dispatch(resetEncodedChars());
          dispatch(setIsStreaming(true));

          const response = await fetch(
            `${BASE_URL}encode?input=${encodeURIComponent(text)}`,
            {
              method: "POST",
              signal,
            },
          );

          if (!response.ok)
            throw new Error(`Server error: ${response.statusText}`);
          if (!response.body) throw new Error("No response body from server");

          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          try {
            // eslint-disable-next-line no-constant-condition
            while (true) {
              const { done, value } = await reader.read();
              
              if (done) break;
              
              const buffer = decoder.decode(value, { stream: true });
              const raw = buffer
                .replace(/^\[/, "")
                .replace(/^,/, "")
                .replace(/\]$/, "");
              const parsed: EncodeCharResponse = JSON.parse(raw);

              dispatch(
                setNewEncodedChar({
                  encodedChar: parsed.encodedChar,
                  progress: parsed.progress,
                }),
              );
            }
          } catch (err) {
            await reader.cancel();
            if ((err as Error).name === "AbortError") {
              dispatch(resetEncodedChars());
            }
            throw err;
          }

          return { data: { encodedChar: "", progress: 100 } };
        } catch (err) {
          throw new Error(`Encoding failed: ${(err as Error).message}`);
        } finally {
          dispatch(setIsStreaming(false));
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { useEncodeTextMutation } = encodeApi;
