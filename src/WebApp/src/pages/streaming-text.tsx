import { EncodedOccurrences } from "../features/encoded-ocurrences/encoded-occurrences";
import { EncodedText } from "../features/encoded-text/encoded-text";
import { InputText } from "../features/input-text/input-text";
import "./streaming-text.less";

export const StreamingText : React.FC = () =>{
  return (
    <div className="streaming-text-container container">
      <InputText />
      <EncodedText />
      <EncodedOccurrences />
    </div>
  );
};
