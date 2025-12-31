/**
 * Text Layer Operations Service
 * Single Responsibility: Text layer business logic
 */

import { generateUUID } from "@umituz/react-native-uuid";
import type { Scene, TextLayer } from "../../../domain/entities";
import type { LayerOperationResult, AddTextLayerData } from "../../types";

class TextLayerOperationsService {
  /**
   * Add text layer to scene
   */
  addTextLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerData: AddTextLayerData,
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

      const newLayer: TextLayer = {
        id: generateUUID(),
        type: "text",
        content: layerData.content || "",
        position: { x: 10, y: 40 },
        size: { width: 80, height: 20 },
        rotation: 0,
        opacity: 1,
        fontSize: layerData.fontSize || 48,
        fontFamily: layerData.fontFamily || "System",
        fontWeight: (layerData.fontWeight as TextLayer["fontWeight"]) || "bold",
        color: layerData.color || defaultColor,
        textAlign: layerData.textAlign || "center",
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
          error instanceof Error ? error.message : "Failed to add text layer",
      };
    }
  }

  /**
   * Edit text layer
   */
  editTextLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
    layerData: Partial<TextLayer>,
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
      } as TextLayer;

      return { success: true, updatedScenes };
    } catch (error) {
      return {
        success: false,
        updatedScenes: scenes,
        error:
          error instanceof Error ? error.message : "Failed to edit text layer",
      };
    }
  }
}

export const textLayerOperationsService = new TextLayerOperationsService();
