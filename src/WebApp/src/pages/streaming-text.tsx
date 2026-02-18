import { EncodedOcurrences } from "../features/encoded-ocurrences/encoded-ocurrences";
import { EncodedText } from "../features/encoded-text/encoded-text";
import { InputText } from "../features/input-text/input-text";
import "./streaming-text.less";

export const StreamingText : React.FC = () =>{
  return (
    <div className="streaming-text-container container">
      <InputText />
      <EncodedText />
      <EncodedOcurrences />
    </div>
  );
};
