/**
 * Shape Layer Operations Service
 * Single Responsibility: Shape layer business logic
 */

import { generateUUID } from "@umituz/react-native-design-system/uuid";
import type { ShapeLayer, Scene } from "../../domain/entities/video-project.types";
import type { LayerOperationResult, AddShapeLayerData } from "../../domain/entities/video-project.types";
import { BaseLayerOperationsService } from "./base/base-layer-operations.service";

interface ShapeLayerDataWithDefault extends AddShapeLayerData {
  defaultColor: string;
}

class ShapeLayerOperationsService extends BaseLayerOperationsService<ShapeLayer> {
  protected createLayer(data: unknown): ShapeLayer {
    const { defaultColor, ...layerData } = data as ShapeLayerDataWithDefault;

    return {
      id: generateUUID(),
      type: "shape",
      shape: (layerData.shape ?? "rectangle") as ShapeLayer["shape"],
      position: { x: 25, y: 25 },
      size: { width: 50, height: 50 },
      rotation: 0,
      opacity: layerData.opacity ?? 1,
      fillColor: layerData.fillColor ?? defaultColor,
      borderColor: layerData.borderColor,
      borderWidth: layerData.borderWidth,
    };
  }

  protected validateLayerData(): string | null {
    return null;
  }

  protected getLayerType(): ShapeLayer["type"] {
    return "shape";
  }

  addShapeLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerData: AddShapeLayerData,
    defaultColor: string,
  ): LayerOperationResult {
    return this.addLayer(scenes, sceneIndex, { ...layerData, defaultColor });
  }
}

export const shapeLayerOperationsService = new ShapeLayerOperationsService();
