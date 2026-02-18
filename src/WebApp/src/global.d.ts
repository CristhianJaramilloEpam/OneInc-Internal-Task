declare global {
  interface Window {
    bootstrap: {
      Toast: new (element: HTMLElement, options?: {
        autohide?: boolean;
        delay?: number;
      }) => {
        show: () => void;
        hide: () => void;
        dispose: () => void;
      };
    };
  }
}

export {};