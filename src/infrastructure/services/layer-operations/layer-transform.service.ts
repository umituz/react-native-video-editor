/**
 * Layer Transform Service
 * Single Responsibility: Handle layer position, size, and animation updates
 */

import type { Scene, Animation } from "../../../domain/entities/video-project.types";
import type { LayerOperationResult } from "../../../domain/entities/video-project.types";

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

      // Validate position values (percentage: 0-100)
      const clampedX = Math.max(0, Math.min(100, x));
      const clampedY = Math.max(0, Math.min(100, y));

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
        position: { x: clampedX, y: clampedY },
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

      // Validate size values (percentage: 1-100, minimum 1% to prevent invisible layers)
      const clampedWidth = Math.max(1, Math.min(100, width));
      const clampedHeight = Math.max(1, Math.min(100, height));

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
        size: { width: clampedWidth, height: clampedHeight },
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

      const existingLayer = updatedScenes[sceneIndex].layers[layerIndex];
      updatedScenes[sceneIndex].layers[layerIndex] = {
        ...existingLayer,
        animation,
      };

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
