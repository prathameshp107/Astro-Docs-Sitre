import { useEffect } from "react";

export default function useKeyboardShortcut(handler, key = "Enter") {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === key) {
        e.preventDefault();
        handler();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handler, key]);
}
