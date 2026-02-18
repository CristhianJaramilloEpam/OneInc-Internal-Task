(async () => {
  const { createRoot } = await import("react-dom/client");
  const { Root } = await import("./Root");
  const rootElement = document.querySelector("#root");
  if (rootElement === null) {
    window.console.error(new Error("#root not found"));
    return;
  }
  const root = createRoot(rootElement);
  root.render(<Root />);
})();
