/**
 * Shape Layer Operations Service
 * Single Responsibility: Shape layer business logic
 */

import { generateUUID } from "@umituz/react-native-design-system";
import type { Scene, ShapeLayer } from "../../domain/entities";
import type { LayerOperationResult, AddShapeLayerData } from "../../domain/entities";

class ShapeLayerOperationsService {
  /**
   * Add shape layer to scene
   */
  addShapeLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerData: AddShapeLayerData,
    defaultColor: string,
  ): LayerOperationResult {
    try {
      if (sceneIndex < 0 || sceneIndex >= scenes.length) {
        return {
          success: false,
          updatedScenes: scenes,
          error: "Invalid scene index",
        };
      }

      const newLayer: ShapeLayer = {
        id: generateUUID(),
        type: "shape",
        shape: (layerData.shape as ShapeLayer["shape"]) || "rectangle",
        position: { x: 25, y: 25 },
        size: { width: 50, height: 50 },
        rotation: 0,
        opacity: layerData.opacity || 1,
        fillColor: layerData.fillColor || defaultColor,
        borderColor: layerData.borderColor,
        borderWidth: layerData.borderWidth,
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
          error instanceof Error ? error.message : "Failed to add shape layer",
      };
    }
  }
}

export const shapeLayerOperationsService = new ShapeLayerOperationsService();
