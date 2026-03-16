/**
 * Layer Duplicate Service
 * Single Responsibility: Handle layer duplication operations
 */

import { generateUUID } from "@umituz/react-native-design-system/uuid";
import type { Scene } from "../../../domain/entities/video-project.types";
import type { LayerOperationResult } from "../../../domain/entities/video-project.types";
import { cloneLayerWithNewId } from "../../../infrastructure/utils/data-clone.utils";

class LayerDuplicateService {
  /**
   * Duplicate layer
   * Optimized using clone utility for better performance
   */
  duplicateLayer(
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
      const layers = updatedScenes[sceneIndex].layers;
      const layerToDuplicate = layers.find((l) => l.id === layerId);

      if (!layerToDuplicate) {
        return {
          success: false,
          updatedScenes: scenes,
          error: "Layer not found",
        };
      }

      // Use clone utility for consistent duplication
      const duplicatedLayer = {
        ...cloneLayerWithNewId(layerToDuplicate, generateUUID),
        position: {
          x: layerToDuplicate.position.x + 5,
          y: layerToDuplicate.position.y + 5,
        },
      };

      updatedScenes[sceneIndex] = {
        ...updatedScenes[sceneIndex],
        layers: [...layers, duplicatedLayer],
      };

      return { success: true, updatedScenes };
    } catch (error) {
      return {
        success: false,
        updatedScenes: scenes,
        error:
          error instanceof Error ? error.message : "Failed to duplicate layer",
      };
    }
  }
}

export const layerDuplicateService = new LayerDuplicateService();
