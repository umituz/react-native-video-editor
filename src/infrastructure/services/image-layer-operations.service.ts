/**
 * Image Layer Operations Service
 * Single Responsibility: Image layer business logic
 */

import { generateUUID } from "@umituz/react-native-design-system/uuid";
import type { ImageLayer } from "../../domain/entities/video-project.types";
import type { LayerOperationResult, AddImageLayerData } from "../../domain/entities/video-project.types";
import { BaseLayerOperationsService } from "./base/base-layer-operations.service";

class ImageLayerOperationsService extends BaseLayerOperationsService<ImageLayer> {
  protected createLayer(data: unknown): ImageLayer {
    const layerData = data as AddImageLayerData;

    return {
      id: generateUUID(),
      type: "image",
      uri: layerData.uri ?? "",
      position: { x: 15, y: 30 },
      size: { width: 70, height: 40 },
      rotation: 0,
      opacity: layerData.opacity ?? 1,
      animation: {
        type: "fade",
        duration: 500,
        easing: "ease-in-out",
      },
    };
  }

  protected validateLayerData(data: unknown): string | null {
    const layerData = data as AddImageLayerData;
    if (!layerData.uri || layerData.uri.trim().length === 0) {
      return "Image URI is required";
    }
    return null;
  }

  protected getLayerType(): ImageLayer["type"] {
    return "image";
  }

  addImageLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerData: AddImageLayerData,
  ): LayerOperationResult {
    return this.addLayer(scenes, sceneIndex, layerData);
  }

  editImageLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
    layerData: Partial<ImageLayer>,
  ): LayerOperationResult {
    return this.editLayer(scenes, sceneIndex, layerId, layerData);
  }
}

export const imageLayerOperationsService = new ImageLayerOperationsService();
