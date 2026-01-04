/**
 * useSceneActions Hook
 * Single Responsibility: Scene action handlers
 */

import { useCallback } from "react";
import { AudioEditor } from "../components/AudioEditor";
import { SceneActionsMenu } from "../components/SceneActionsMenu";
import type { UseEditorScenesReturn } from "./useEditorScenes";
import type { UseEditorBottomSheetReturn } from "./useEditorBottomSheet";

export interface UseSceneActionsParams {
  currentScene: any;
  scenes: UseEditorScenesReturn;
  bottomSheet: UseEditorBottomSheetReturn;
}

export interface UseSceneActionsReturn {
  handleAudio: () => void;
  handleSceneLongPress: (index: number, canDelete: boolean) => void;
}

export function useSceneActions({
  currentScene,
  scenes,
  bottomSheet,
}: UseSceneActionsParams): UseSceneActionsReturn {
  const { openBottomSheet, closeBottomSheet } = bottomSheet;

  const handleAudio = useCallback(() => {
    if (!currentScene) return;
    openBottomSheet({
      title: currentScene.audio ? "Edit Audio" : "Add Audio",
      children: (
        <AudioEditor
          audio={currentScene.audio}
          onSave={scenes.updateSceneAudio}
          onRemove={
            currentScene.audio
              ? () => scenes.updateSceneAudio(undefined)
              : undefined
          }
          onCancel={closeBottomSheet}
        />
      ),
    });
  }, [
    currentScene,
    scenes.updateSceneAudio,
    openBottomSheet,
    closeBottomSheet,
  ]);

  const handleSceneLongPress = useCallback(
    (index: number, canDelete: boolean) => {
      openBottomSheet({
        title: `Scene ${index + 1} Actions`,
        children: (
          <SceneActionsMenu
            sceneIndex={index}
            canDelete={canDelete}
            onDuplicate={() => {
              closeBottomSheet();
              scenes.duplicateScene(index);
            }}
            onDelete={() => {
              closeBottomSheet();
              scenes.deleteScene(index);
            }}
          />
        ),
      });
    },
    [scenes, openBottomSheet, closeBottomSheet],
  );

  return {
    handleAudio,
    handleSceneLongPress,
  };
}
