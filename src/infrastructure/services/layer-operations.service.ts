/**
 * Layer Operations Service (Facade)
 * Single Responsibility: Coordinate layer operations across specialized services
 */

import { textLayerOperationsService } from "./text-layer-operations.service";
import { imageLayerOperationsService } from "./image-layer-operations.service";
import { shapeLayerOperationsService } from "./shape-layer-operations.service";
import { layerManipulationService } from "./layer-manipulation.service";
import type { Scene, TextLayer, ImageLayer, Animation } from "../../../domain/entities";
import type {
  LayerOperationResult,
  LayerOrderAction,
  AddTextLayerData,
  AddImageLayerData,
  AddShapeLayerData,
} from "../../types";

class LayerOperationsService {
  /**
   * Add text layer to scene
   */
  addTextLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerData: AddTextLayerData,
    defaultColor: string,
  ): LayerOperationResult {
    return textLayerOperationsService.addTextLayer(
      scenes,
      sceneIndex,
      layerData,
      defaultColor,
    );
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
    return textLayerOperationsService.editTextLayer(
      scenes,
      sceneIndex,
      layerId,
      layerData,
    );
  }

  /**
   * Add image layer to scene
   */
  addImageLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerData: AddImageLayerData,
  ): LayerOperationResult {
    return imageLayerOperationsService.addImageLayer(
      scenes,
      sceneIndex,
      layerData,
    );
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
    return imageLayerOperationsService.editImageLayer(
      scenes,
      sceneIndex,
      layerId,
      layerData,
    );
  }

  /**
   * Add shape layer to scene
   */
  addShapeLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerData: AddShapeLayerData,
    defaultColor: string,
  ): LayerOperationResult {
    return shapeLayerOperationsService.addShapeLayer(
      scenes,
      sceneIndex,
      layerData,
      defaultColor,
    );
  }

  /**
   * Delete layer from scene
   */
  deleteLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
  ): LayerOperationResult {
    return layerManipulationService.deleteLayer(scenes, sceneIndex, layerId);
  }

  /**
   * Change layer order
   */
  changeLayerOrder(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
    action: LayerOrderAction,
  ): LayerOperationResult {
    return layerManipulationService.changeLayerOrder(
      scenes,
      sceneIndex,
      layerId,
      action,
    );
  }

  /**
   * Duplicate layer
   */
  duplicateLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
  ): LayerOperationResult {
    return layerManipulationService.duplicateLayer(scenes, sceneIndex, layerId);
  }

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
    return layerManipulationService.updateLayerPosition(
      scenes,
      sceneIndex,
      layerId,
      x,
      y,
    );
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
    return layerManipulationService.updateLayerSize(
      scenes,
      sceneIndex,
      layerId,
      width,
      height,
    );
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
    return layerManipulationService.updateLayerAnimation(
      scenes,
      sceneIndex,
      layerId,
      animation,
    );
  }
}

export const layerOperationsService = new LayerOperationsService();
