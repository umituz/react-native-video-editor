/**
 * Layer Manipulation Service
 * Orchestrator service that delegates to specialized layer operation services
 */

import type { Scene, Animation } from "../../domain/entities";
import type { LayerOperationResult, LayerOrderAction } from "../../domain/entities";
import {
  layerDeleteService,
  layerOrderService,
  layerDuplicateService,
  layerTransformService,
} from "./layer-operations";

class LayerManipulationService {
  deleteLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
  ): LayerOperationResult {
    return layerDeleteService.deleteLayer(scenes, sceneIndex, layerId);
  }

  changeLayerOrder(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
    action: LayerOrderAction,
  ): LayerOperationResult {
    return layerOrderService.changeLayerOrder(
      scenes,
      sceneIndex,
      layerId,
      action,
    );
  }

  duplicateLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
  ): LayerOperationResult {
    return layerDuplicateService.duplicateLayer(scenes, sceneIndex, layerId);
  }

  updateLayerPosition(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
    x: number,
    y: number,
  ): LayerOperationResult {
    return layerTransformService.updateLayerPosition(
      scenes,
      sceneIndex,
      layerId,
      x,
      y,
    );
  }

  updateLayerSize(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
    width: number,
    height: number,
  ): LayerOperationResult {
    return layerTransformService.updateLayerSize(
      scenes,
      sceneIndex,
      layerId,
      width,
      height,
    );
  }

  updateLayerAnimation(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
    animation: Animation | undefined,
  ): LayerOperationResult {
    return layerTransformService.updateLayerAnimation(
      scenes,
      sceneIndex,
      layerId,
      animation,
    );
  }
}

export const layerManipulationService = new LayerManipulationService();
