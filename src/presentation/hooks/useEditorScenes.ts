/**
 * useEditorScenes Hook
 * Single Responsibility: Scene operations for editor
 */

import { useCallback } from "react";
import { Alert } from "react-native";
import { useLocalization } from "@umituz/react-native-settings";
import { sceneOperationsService } from "../../infrastructure/services/scene-operations.service";
import type { Scene, Audio } from "../../domain/entities";

interface UseEditorScenesParams {
  scenes: Scene[];
  currentSceneIndex: number;
  onUpdateScenes: (scenes: Scene[]) => void;
  onSceneIndexChange: (index: number) => void;
}

export interface UseEditorScenesReturn {
  addScene: () => void;
  duplicateScene: (sceneIndex: number) => void;
  deleteScene: (sceneIndex: number) => void;
  updateSceneAudio: (audio: Audio | undefined) => void;
}

export function useEditorScenes({
  scenes,
  currentSceneIndex,
  onUpdateScenes,
  onSceneIndexChange,
}: UseEditorScenesParams): UseEditorScenesReturn {
  const { t } = useLocalization();

  const addScene = useCallback(() => {
    const result = sceneOperationsService.addScene(scenes);
    if (result.success) {
      onUpdateScenes(result.updatedScenes);
      if (result.newSceneIndex !== undefined) {
        onSceneIndexChange(result.newSceneIndex);
      }
      Alert.alert(t("editor.scenes.add.success"));
    } else {
      Alert.alert(t("editor.scenes.add.error"));
    }
  }, [scenes, onUpdateScenes, onSceneIndexChange, t]);

  const duplicateScene = useCallback(
    (sceneIndex: number) => {
      const result = sceneOperationsService.duplicateScene(scenes, sceneIndex);
      if (result.success) {
        onUpdateScenes(result.updatedScenes);
        if (result.newSceneIndex !== undefined) {
          onSceneIndexChange(result.newSceneIndex);
        }
        Alert.alert(t("editor.scenes.duplicate.success"));
      } else {
        Alert.alert(t("editor.scenes.duplicate.error"));
      }
    },
    [scenes, onUpdateScenes, onSceneIndexChange, t],
  );

  const deleteScene = useCallback(
    (sceneIndex: number) => {
      const result = sceneOperationsService.deleteScene(
        scenes,
        sceneIndex,
        currentSceneIndex,
      );
      if (result.success) {
        onUpdateScenes(result.updatedScenes);
        if (result.newSceneIndex !== undefined) {
          onSceneIndexChange(result.newSceneIndex);
        }
        Alert.alert(t("editor.scenes.delete.success"));
      } else {
        Alert.alert(t("editor.scenes.delete.error"));
      }
    },
    [scenes, currentSceneIndex, onUpdateScenes, onSceneIndexChange, t],
  );

  const updateSceneAudio = useCallback(
    (audio: Audio | undefined) => {
      const result = sceneOperationsService.updateSceneAudio(
        scenes,
        currentSceneIndex,
        audio,
      );
      if (result.success) {
        onUpdateScenes(result.updatedScenes);
        Alert.alert(
          t("editor.scenes.audio.success"),
          t(audio ? "editor.scenes.audio.added" : "editor.scenes.audio.removed"),
        );
      } else {
        Alert.alert(t("editor.scenes.audio.error"));
      }
    },
    [scenes, currentSceneIndex, onUpdateScenes, t],
  );

  return {
    addScene,
    duplicateScene,
    deleteScene,
    updateSceneAudio,
  };
}
