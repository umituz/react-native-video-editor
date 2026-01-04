/**
 * useEditorScenes Hook
 * Single Responsibility: Scene operations for editor
 */

import { useCallback } from "react";
import { Alert } from "react-native";
import { sceneOperationsService } from "../../infrastructure/services/scene-operations.service";
import type { Audio } from "../../domain/entities";

export interface UseEditorScenesParams {
  scenes: any[];
  currentSceneIndex: number;
  onUpdateScenes: (scenes: any[]) => void;
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
  const addScene = useCallback(() => {
    const result = sceneOperationsService.addScene(scenes);
    if (result.success) {
      onUpdateScenes(result.updatedScenes);
      if (result.newSceneIndex !== undefined) {
        onSceneIndexChange(result.newSceneIndex);
      }
      Alert.alert("Success", "New scene added!");
    } else {
      Alert.alert("Error", result.error || "Failed to add scene");
    }
  }, [scenes, onUpdateScenes, onSceneIndexChange]);

  const duplicateScene = useCallback(
    (sceneIndex: number) => {
      const result = sceneOperationsService.duplicateScene(scenes, sceneIndex);
      if (result.success) {
        onUpdateScenes(result.updatedScenes);
        if (result.newSceneIndex !== undefined) {
          onSceneIndexChange(result.newSceneIndex);
        }
        Alert.alert("Success", "Scene duplicated!");
      } else {
        Alert.alert("Error", result.error || "Failed to duplicate scene");
      }
    },
    [scenes, onUpdateScenes, onSceneIndexChange],
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
        Alert.alert("Success", "Scene deleted");
      } else {
        Alert.alert("Error", result.error || "Failed to delete scene");
      }
    },
    [scenes, currentSceneIndex, onUpdateScenes, onSceneIndexChange],
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
          "Success",
          audio ? "Audio added to scene!" : "Audio removed from scene",
        );
      } else {
        Alert.alert("Error", result.error || "Failed to update scene audio");
      }
    },
    [scenes, currentSceneIndex, onUpdateScenes],
  );

  return {
    addScene,
    duplicateScene,
    deleteScene,
    updateSceneAudio,
  };
}
