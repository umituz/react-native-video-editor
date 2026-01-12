/**
 * useEditorHistory Hook
 * Single Responsibility: History operations for editor
 */

import { useCallback, useState } from "react";
import type { VideoProject } from "../../domain/entities";

export interface UseEditorHistoryParams {
  project: VideoProject | undefined;
  projectId: string; // Kept for interface compatibility, used for reset if needed
  onUpdateProject: (updates: Partial<VideoProject>) => void;
}

export interface UseEditorHistoryReturn {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  updateWithHistory: (updates: Partial<VideoProject>, action: string) => void;
}

export function useEditorHistory({
  project,
  onUpdateProject,
}: UseEditorHistoryParams): UseEditorHistoryReturn {
  const [history, setHistory] = useState<VideoProject[]>([]);
  const [future, setFuture] = useState<VideoProject[]>([]);

  const updateWithHistory = useCallback(
    (updates: Partial<VideoProject>, _action: string) => {
      if (project) {
        // Push current state to history before updating
        setHistory((prev) => [...prev, project]);
        // Clear future
        setFuture([]);
        
        onUpdateProject(updates);
      }
    },
    [project, onUpdateProject],
  );

  const undo = useCallback(() => {
    if (history.length === 0 || !project) return;

    const previousState = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    setFuture((prev) => [project, ...prev]);
    setHistory(newHistory);

    // Full replacement of state
    // We assume onUpdateProject can handle a full object which is a superset of Partial
    onUpdateProject(previousState);
  }, [history, project, onUpdateProject]);

  const redo = useCallback(() => {
    if (future.length === 0 || !project) return;

    const nextState = future[0];
    const newFuture = future.slice(1);

    setHistory((prev) => [...prev, project]);
    setFuture(newFuture);

    onUpdateProject(nextState);
  }, [future, project, onUpdateProject]);

  return {
    undo,
    redo,
    canUndo: history.length > 0,
    canRedo: future.length > 0,
    updateWithHistory,
  };
}
