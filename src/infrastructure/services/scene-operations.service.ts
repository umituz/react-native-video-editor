/**
 * Scene Operations Service
 * Single Responsibility: Business logic for scene operations
 */

import { generateUUID } from "@umituz/react-native-design-system/uuid";
import type { Scene, Audio } from "../../domain/entities";
import type { SceneOperationResult } from "../../domain/entities";

class SceneOperationsService {
  /**
   * Add new scene
   */
  addScene(scenes: Scene[]): SceneOperationResult {
    try {
      const newScene: Scene = {
        id: generateUUID(),
        duration: 5000,
        background: { type: "color", value: "#000000" },
        layers: [],
        transition: { type: "fade", duration: 500 },
      };

      const updatedScenes = [...scenes, newScene];
      return {
        success: true,
        updatedScenes,
        newSceneIndex: updatedScenes.length - 1,
      };
    } catch (error) {
      return {
        success: false,
        updatedScenes: scenes,
        error: error instanceof Error ? error.message : "Failed to add scene",
      };
    }
  }

  /**
   * Duplicate scene
   */
  duplicateScene(scenes: Scene[], sceneIndex: number): SceneOperationResult {
    try {
      if (sceneIndex < 0 || sceneIndex >= scenes.length) {
        return {
          success: false,
          updatedScenes: scenes,
          error: "Invalid scene index",
        };
      }

      const sceneToDuplicate = scenes[sceneIndex];
      const duplicatedScene: Scene = {
        ...JSON.parse(JSON.stringify(sceneToDuplicate)),
        id: generateUUID(),
        layers: sceneToDuplicate.layers.map((layer) => ({
          ...layer,
          id: generateUUID(),
        })),
      };

      const updatedScenes = [...scenes];
      updatedScenes.splice(sceneIndex + 1, 0, duplicatedScene);

      return {
        success: true,
        updatedScenes,
        newSceneIndex: sceneIndex + 1,
      };
    } catch (error) {
      return {
        success: false,
        updatedScenes: scenes,
        error:
          error instanceof Error ? error.message : "Failed to duplicate scene",
      };
    }
  }

  /**
   * Delete scene
   */
  deleteScene(
    scenes: Scene[],
    sceneIndex: number,
    currentSceneIndex: number,
  ): SceneOperationResult {
    try {
      if (scenes.length === 1) {
        return {
          success: false,
          updatedScenes: scenes,
          error: "Cannot delete the last scene",
        };
      }

      if (sceneIndex < 0 || sceneIndex >= scenes.length) {
        return {
          success: false,
          updatedScenes: scenes,
          error: "Invalid scene index",
        };
      }

      const updatedScenes = scenes.filter((_, index) => index !== sceneIndex);

      let newSceneIndex = currentSceneIndex;
      if (currentSceneIndex >= updatedScenes.length) {
        newSceneIndex = updatedScenes.length - 1;
      } else if (currentSceneIndex > sceneIndex) {
        newSceneIndex = currentSceneIndex - 1;
      }

      return {
        success: true,
        updatedScenes,
        newSceneIndex,
      };
    } catch (error) {
      return {
        success: false,
        updatedScenes: scenes,
        error:
          error instanceof Error ? error.message : "Failed to delete scene",
      };
    }
  }

  /**
   * Update scene audio
   */
  updateSceneAudio(
    scenes: Scene[],
    sceneIndex: number,
    audio: Audio | undefined,
  ): SceneOperationResult {
    try {
      if (sceneIndex < 0 || sceneIndex >= scenes.length) {
        return {
          success: false,
          updatedScenes: scenes,
          error: "Invalid scene index",
        };
      }

      const updatedScenes = [...scenes];
      updatedScenes[sceneIndex] = {
        ...updatedScenes[sceneIndex],
        audio,
      };

      return { success: true, updatedScenes };
    } catch (error) {
      return {
        success: false,
        updatedScenes: scenes,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update scene audio",
      };
    }
  }
}

export const sceneOperationsService = new SceneOperationsService();
