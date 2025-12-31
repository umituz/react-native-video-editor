/**
 * Layer Delete Service
 * Single Responsibility: Handle layer deletion operations
 */

import type { Scene } from "../../../domain/entities";
import type { LayerOperationResult } from "../../../types";

class LayerDeleteService {
  /**
   * Delete layer from scene
   */
  deleteLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
  ): LayerOperationResult {
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
        layers: updatedScenes[sceneIndex].layers.filter(
          (l) => l.id !== layerId,
        ),
      };

      return { success: true, updatedScenes };
    } catch (error) {
      return {
        success: false,
        updatedScenes: scenes,
        error:
          error instanceof Error ? error.message : "Failed to delete layer",
      };
    }
  }
}

export const layerDeleteService = new LayerDeleteService();
