/**
 * Text Layer Operations Service
 * Single Responsibility: Text layer business logic
 */

import { generateUUID } from "@umituz/react-native-design-system/uuid";
import type { TextLayer } from "../../domain/entities/video-project.types";
import type { LayerOperationResult, AddTextLayerData } from "../../domain/entities/video-project.types";
import { BaseLayerOperationsService } from "./base/base-layer-operations.service";

interface TextLayerDataWithDefault extends AddTextLayerData {
  defaultColor: string;
}

class TextLayerOperationsService extends BaseLayerOperationsService<TextLayer> {
  protected createLayer(data: unknown): TextLayer {
    const { defaultColor, ...layerData } = data as TextLayerDataWithDefault;

    return {
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
  }

  protected validateLayerData(data: unknown): string | null {
    const layerData = data as AddTextLayerData;
    if (!layerData.content || layerData.content.trim().length === 0) {
      return "Text content is required";
    }
    return null;
  }

  protected getLayerType(): TextLayer["type"] {
    return "text";
  }

  addTextLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerData: AddTextLayerData,
    defaultColor: string,
  ): LayerOperationResult {
    return this.addLayer(scenes, sceneIndex, { ...layerData, defaultColor });
  }

  editTextLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
    layerData: Partial<TextLayer>,
  ): LayerOperationResult {
    return this.editLayer(scenes, sceneIndex, layerId, layerData);
  }
}

export const textLayerOperationsService = new TextLayerOperationsService();
