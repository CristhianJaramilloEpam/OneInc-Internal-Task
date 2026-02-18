import { SubmitHandler, useForm } from "react-hook-form";
import { Header } from "../../components/header";
import "./input-text.less";
import { ProgressBar } from "../../components/progress-bar";
import { useEncodeTextMutation } from "../../context/api/encode-api";
import { useAppSelector } from "../../context/hooks";
import { useEffect, useRef } from "react";
import { useToast } from "../../hooks/useToast";
import { Toast } from "../../components/toast";

type Inputs = {
  text: string;
};

export const InputText: React.FC = () => {
  const [encodeText, { isLoading: isEncoding, isSuccess}] = useEncodeTextMutation();
  const { toast, showToast, hideToast } = useToast();
  const progress = useAppSelector<number>(
    (state) => state.encode.progress || 0,
  );
  const isStreaming = useAppSelector<boolean>(
    (state) => state.encode.isStreaming || false,
  );
  const mutationRef = useRef<ReturnType<typeof encodeText> | null>(null);

  useEffect(() => {
    if (isSuccess && !isEncoding) {
      showToast("Encoding completed successfully!", "success");
    }
  }, [isSuccess, isEncoding]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    mutationRef.current = encodeText({
      text: data.text,
    });
    
  };

  const handleStop = (e: React.MouseEvent<HTMLButtonElement>) => {
    mutationRef.current?.abort();
    mutationRef.current = null;
    showToast("Encoding stopped", "warning");
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <form
        className="streaming-text__form"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {!isStreaming ? (
          <>
            <input
              type="text"
              className="form-control"
              id="input-text"
              placeholder="Enter text"
              {...register("text", { required: true })}
            />
            <button type="submit" className="btn btn-primary">
              Process
            </button>
          </>
        ) : (
          <>
            <ProgressBar progress={progress}></ProgressBar>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleStop}
            >
              Cancel
            </button>
          </>
        )}
      </form>
      {errors.text && <span className="text-danger">* This field is required</span>}
      <Toast
        message={toast.message}
        show={toast.show}
        type={toast.type}
        onHide={hideToast}
      ></Toast>
    </>
  );
};
