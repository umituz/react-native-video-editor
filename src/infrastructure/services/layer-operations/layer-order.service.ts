/**
 * Layer Order Service
 * Single Responsibility: Handle layer ordering operations
 */

import type { Scene } from "../../../domain/entities";
import type { LayerOperationResult, LayerOrderAction } from "../../../types";

class LayerOrderService {
  /**
   * Change layer order
   */
  changeLayerOrder(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
    action: LayerOrderAction,
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
      const scene = updatedScenes[sceneIndex];
      const layerIndex = scene.layers.findIndex((l) => l.id === layerId);

      if (layerIndex === -1) {
        return {
          success: false,
          updatedScenes: scenes,
          error: "Layer not found",
        };
      }

      const updatedLayers = [...scene.layers];
      let newIndex = layerIndex;

      switch (action) {
        case "front":
          newIndex = updatedLayers.length - 1;
          break;
        case "back":
          newIndex = 0;
          break;
        case "up":
          newIndex = Math.min(layerIndex + 1, updatedLayers.length - 1);
          break;
        case "down":
          newIndex = Math.max(layerIndex - 1, 0);
          break;
      }

      if (newIndex !== layerIndex) {
        const [layer] = updatedLayers.splice(layerIndex, 1);
        updatedLayers.splice(newIndex, 0, layer);
      }

      updatedScenes[sceneIndex] = {
        ...scene,
        layers: updatedLayers,
      };

      return { success: true, updatedScenes };
    } catch (error) {
      return {
        success: false,
        updatedScenes: scenes,
        error:
          error instanceof Error
            ? error.message
            : "Failed to change layer order",
      };
    }
  }
}

export const layerOrderService = new LayerOrderService();
