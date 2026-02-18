import { useAppSelector } from "../../context/hooks";
import "./encoded-text.less";

export const EncodedText: React.FC = () => {
  const encodedChars = useAppSelector<string[]>(
    (state) => state.encode.encodedChars || [],
  );

  return (
    <>
      {encodedChars.length > 0 && (
        <>
          <section className="streaming-text__encoded-results">
            {" "}
            <h5>Encoded Text</h5>
            <span className="streaming-text__encoded-results__text">
              {encodedChars.join("")}
            </span>
          </section>          
        </>
      )}
    </>
  );
};
