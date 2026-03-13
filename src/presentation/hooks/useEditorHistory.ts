/**
 * useEditorHistory Hook
 * Single Responsibility: History operations for editor
 */

import { useCallback, useState } from "react";
import type { VideoProject } from "../../domain/entities/video-project.types";

interface UseEditorHistoryParams {
  project: VideoProject | undefined;
  onUpdateProject: (updates: Partial<VideoProject>) => void;
}

interface UseEditorHistoryReturn {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  updateWithHistory: (updates: Partial<VideoProject>, action: string) => void;
}

const MAX_HISTORY_SIZE = 50;

export function useEditorHistory({
  project,
  onUpdateProject,
}: UseEditorHistoryParams): UseEditorHistoryReturn {
  const [history, setHistory] = useState<VideoProject[]>([]);
  const [future, setFuture] = useState<VideoProject[]>([]);

  const updateWithHistory = useCallback(
    (updates: Partial<VideoProject>, _action: string) => {
      if (project) {
        // Deep clone the project to avoid reference issues
        const clonedProject = JSON.parse(JSON.stringify(project)) as VideoProject;
        setHistory((prev) => {
          const next = [...prev, clonedProject];
          return next.length > MAX_HISTORY_SIZE ? next.slice(-MAX_HISTORY_SIZE) : next;
        });
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
