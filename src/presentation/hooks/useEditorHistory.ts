/**
 * useEditorHistory Hook
 * Single Responsibility: History operations for editor
 */

import { useCallback } from "react";
import { Alert } from "react-native";
import { useLocalization } from "@umituz/react-native-localization";
// TODO: Refactor to use TanStack Query instead of store
// Temporary stub until refactor
const useHistoryStore = () => ({
  addToHistory: () => {},
  pushHistory: (_project: VideoProject | undefined, _action: string) => {},
  undo: () => undefined,
  redo: () => undefined,
  canUndo: () => false,
  canRedo: () => false,
});
import type { VideoProject } from "../../domain/entities";

export interface UseEditorHistoryParams {
  project: VideoProject | undefined;
  projectId: string;
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
  projectId,
  onUpdateProject,
}: UseEditorHistoryParams): UseEditorHistoryReturn {
  const { t } = useLocalization();
  const {
    pushHistory,
    undo: historyUndo,
    redo: historyRedo,
    canUndo,
    canRedo,
  } = useHistoryStore();

  const updateWithHistory = useCallback(
    (updates: Partial<VideoProject>, action: string) => {
      if (project) {
        pushHistory(project, action);
        onUpdateProject(updates);
      }
    },
    [project, pushHistory, onUpdateProject],
  );

  const undo = useCallback(() => {
    const previousState = historyUndo();
    if (previousState) {
      onUpdateProject(previousState);
      Alert.alert(t("editor.history.undo.success"));
    }
  }, [historyUndo, onUpdateProject, t]);

  const redo = useCallback(() => {
    const nextState = historyRedo();
    if (nextState) {
      onUpdateProject(nextState);
      Alert.alert(t("editor.history.redo.success"));
    }
  }, [historyRedo, onUpdateProject, t]);

  return {
    undo,
    redo,
    canUndo: canUndo(),
    canRedo: canRedo(),
    updateWithHistory,
  };
}
