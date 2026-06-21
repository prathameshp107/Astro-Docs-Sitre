import { useCallback } from "react";

export function useSidebarResize(bodyRef, minWidth = 180, maxWidth = 500) {
  return useCallback(
    ({ clientX }) => {
      if (!bodyRef.current) return;
      const left = bodyRef.current.getBoundingClientRect().left;
      const newWidth = Math.max(minWidth, Math.min(maxWidth, clientX - left));
      return newWidth;
    },
    [bodyRef, minWidth, maxWidth]
  );
}

export function useContentResize(workspaceRef, minRatio = 0.2, maxRatio = 0.8) {
  return useCallback(
    ({ clientX }) => {
      if (!workspaceRef.current) return minRatio;
      const rect = workspaceRef.current.getBoundingClientRect();
      return Math.max(minRatio, Math.min(maxRatio, (clientX - rect.left) / rect.width));
    },
    [workspaceRef, minRatio, maxRatio]
  );
}

export function usePanelDrag(panelRef, minHeight, maxHeightRatio = 0.7) {
  return useCallback(
    ({ clientY }) => {
      if (!panelRef.current) return minHeight;
      const rect = panelRef.current.getBoundingClientRect();
      const maxH = rect.height * maxHeightRatio;
      return Math.max(minHeight, Math.min(maxH, rect.bottom - clientY));
    },
    [panelRef, minHeight, maxHeightRatio]
  );
}
