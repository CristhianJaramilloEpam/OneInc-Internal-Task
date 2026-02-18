import { useState } from "react";
import { ToastType } from "../components/toast";

interface ToastState {
  message: string;
  show: boolean;
  type: ToastType;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    show: false,
    type: "primary",
  });

  const showToast = (message: string, type: ToastType = "primary") => {
    setToast({ message, show: true, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  return { toast, showToast, hideToast };
};