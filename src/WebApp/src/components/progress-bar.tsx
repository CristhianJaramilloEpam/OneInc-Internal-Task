import "./progress-bar.less";

export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div
      className="progress streaming-text__progress-bar"
      role="progressbar"
      aria-label="Encoding progress"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </div>
  );
};
