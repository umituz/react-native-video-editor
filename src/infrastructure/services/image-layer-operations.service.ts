/**
 * Image Layer Operations Service
 * Single Responsibility: Image layer business logic
 */

import { generateUUID } from "@umituz/react-native-uuid";
import type { Scene, ImageLayer } from "../../domain/entities";
import type { LayerOperationResult, AddImageLayerData } from "../../domain/entities";

class ImageLayerOperationsService {
  /**
   * Add image layer to scene
   */
  addImageLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerData: AddImageLayerData,
  ): LayerOperationResult {
    try {
      if (sceneIndex < 0 || sceneIndex >= scenes.length) {
        return {
          success: false,
          updatedScenes: scenes,
          error: "Invalid scene index",
        };
      }

      const newLayer: ImageLayer = {
        id: generateUUID(),
        type: "image",
        uri: layerData.uri || "",
        position: { x: 15, y: 30 },
        size: { width: 70, height: 40 },
        rotation: 0,
        opacity: layerData.opacity || 1,
        animation: {
          type: "fade",
          duration: 500,
          easing: "ease-in-out",
        },
      };

      const updatedScenes = [...scenes];
      updatedScenes[sceneIndex] = {
        ...updatedScenes[sceneIndex],
        layers: [...updatedScenes[sceneIndex].layers, newLayer],
      };

      return { success: true, updatedScenes };
    } catch (error) {
      return {
        success: false,
        updatedScenes: scenes,
        error:
          error instanceof Error ? error.message : "Failed to add image layer",
      };
    }
  }

  /**
   * Edit image layer
   */
  editImageLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
    layerData: Partial<ImageLayer>,
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
        ...layerData,
      } as ImageLayer;

      return { success: true, updatedScenes };
    } catch (error) {
      return {
        success: false,
        updatedScenes: scenes,
        error:
          error instanceof Error ? error.message : "Failed to edit image layer",
      };
    }
  }
}

export const imageLayerOperationsService = new ImageLayerOperationsService();
