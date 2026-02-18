import { useEffect, useRef } from "react";
import "./toast.less";

export type ToastType = "primary" | "success" | "danger" | "warning";

interface ToastProps {
  message: string;
  show: boolean;
  type?: ToastType;
  onHide: () => void;
}

export const Toast = ({ message, show, type = "primary", onHide }: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const toastInstanceRef = useRef<InstanceType<Window["bootstrap"]["Toast"]> | null>(null);

  useEffect(() => {
    if (!toastRef.current || !window.bootstrap) return;

    toastInstanceRef.current = new window.bootstrap.Toast(toastRef.current, {
      autohide: true,
      delay: 3000,
    });

    const el = toastRef.current;
    el.addEventListener("hidden.bs.toast", onHide);

    return () => {
      el.removeEventListener("hidden.bs.toast", onHide);
      toastInstanceRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (show) {
      toastInstanceRef.current?.show();
    } else {
      toastInstanceRef.current?.hide();
    }
  }, [show]);

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        ref={toastRef}
        className={`toast align-items-center text-white bg-${type} border-0`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          />
        </div>
      </div>
    </div>
  );
};