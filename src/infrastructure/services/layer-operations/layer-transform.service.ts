/**
 * Layer Transform Service
 * Single Responsibility: Handle layer position, size, and animation updates
 */

import type { Scene, Animation, Layer } from "../../../domain/entities";
import type { LayerOperationResult } from "../../../domain/entities";

class LayerTransformService {
  /**
   * Update layer position
   */
  updateLayerPosition(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
    x: number,
    y: number,
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
      const layerIndex = updatedScenes[sceneIndex].layers.findIndex(
        (l) => l.id === layerId,
      );

      if (layerIndex === -1) {
        return {
          success: false,
          updatedScenes: scenes,
          error: "Layer not found",
        };
      }

      updatedScenes[sceneIndex].layers[layerIndex] = {
        ...updatedScenes[sceneIndex].layers[layerIndex],
        position: { x, y },
      };

      return { success: true, updatedScenes };
    } catch (error) {
      return {
        success: false,
        updatedScenes: scenes,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update layer position",
      };
    }
  }

  /**
   * Update layer size
   */
  updateLayerSize(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
    width: number,
    height: number,
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
      const layerIndex = updatedScenes[sceneIndex].layers.findIndex(
        (l) => l.id === layerId,
      );

      if (layerIndex === -1) {
        return {
          success: false,
          updatedScenes: scenes,
          error: "Layer not found",
        };
      }

      updatedScenes[sceneIndex].layers[layerIndex] = {
        ...updatedScenes[sceneIndex].layers[layerIndex],
        size: { width, height },
      };

      return { success: true, updatedScenes };
    } catch (error) {
      return {
        success: false,
        updatedScenes: scenes,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update layer size",
      };
    }
  }

  /**
   * Update layer animation
   */
  updateLayerAnimation(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
    animation: Animation | undefined,
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
      const layerIndex = updatedScenes[sceneIndex].layers.findIndex(
        (l) => l.id === layerId,
      );

      if (layerIndex === -1) {
        return {
          success: false,
          updatedScenes: scenes,
          error: "Layer not found",
        };
      }

      updatedScenes[sceneIndex].layers[layerIndex] = {
        ...updatedScenes[sceneIndex].layers[layerIndex],
        animation,
      } as Layer;

      return { success: true, updatedScenes };
    } catch (error) {
      return {
        success: false,
        updatedScenes: scenes,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update layer animation",
      };
    }
  }
}

export const layerTransformService = new LayerTransformService();
