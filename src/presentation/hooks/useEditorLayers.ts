/**
 * useEditorLayers Hook
 * Single Responsibility: Compose layer operations
 */

import { useTextLayerOperations } from "./useTextLayerOperations";
import { useImageLayerOperations } from "./useImageLayerOperations";
import { useShapeLayerOperations } from "./useShapeLayerOperations";
import { useLayerManipulation } from "./useLayerManipulation";
import type {
  AddTextLayerData,
  AddImageLayerData,
  AddShapeLayerData,
  LayerOrderAction,
} from "../../domain/entities";
import type { TextLayer, ImageLayer, Animation } from "../../domain/entities";

export interface UseEditorLayersParams {
  projectId: string;
  scenes: any[];
  sceneIndex: number;
  onUpdateScenes: (scenes: any[]) => void;
  onCloseBottomSheet: () => void;
  defaultColor: string;
  onLayerDeleted?: () => void;
}

export interface UseEditorLayersReturn {
  addTextLayer: (data: AddTextLayerData) => void;
  editTextLayer: (layerId: string, data: Partial<TextLayer>) => void;
  addImageLayer: (data: AddImageLayerData) => void;
  editImageLayer: (layerId: string, data: Partial<ImageLayer>) => void;
  addShapeLayer: (data: AddShapeLayerData) => void;
  deleteLayer: (layerId: string) => void;
  changeLayerOrder: (layerId: string, action: LayerOrderAction) => void;
  duplicateLayer: (layerId: string) => void;
  updateLayerPosition: (layerId: string, x: number, y: number) => void;
  updateLayerSize: (layerId: string, width: number, height: number) => void;
  updateLayerAnimation: (
    layerId: string,
    animation: Animation | undefined,
  ) => void;
}

export function useEditorLayers({
  scenes,
  sceneIndex,
  onUpdateScenes,
  onCloseBottomSheet,
  defaultColor,
  onLayerDeleted,
}: UseEditorLayersParams): UseEditorLayersReturn {
  const textLayerOps = useTextLayerOperations({
    scenes,
    sceneIndex,
    onUpdateScenes,
    onCloseBottomSheet,
    defaultColor,
  });

  const imageLayerOps = useImageLayerOperations({
    scenes,
    sceneIndex,
    onUpdateScenes,
    onCloseBottomSheet,
  });

  const shapeLayerOps = useShapeLayerOperations({
    scenes,
    sceneIndex,
    onUpdateScenes,
    onCloseBottomSheet,
    defaultColor,
  });

  const layerManipulation = useLayerManipulation({
    scenes,
    sceneIndex,
    onUpdateScenes,
    onCloseBottomSheet,
    onLayerDeleted,
  });

  return {
    addTextLayer: textLayerOps.addTextLayer,
    editTextLayer: textLayerOps.editTextLayer,
    addImageLayer: imageLayerOps.addImageLayer,
    editImageLayer: imageLayerOps.editImageLayer,
    addShapeLayer: shapeLayerOps.addShapeLayer,
    deleteLayer: layerManipulation.deleteLayer,
    changeLayerOrder: layerManipulation.changeLayerOrder,
    duplicateLayer: layerManipulation.duplicateLayer,
    updateLayerPosition: layerManipulation.updateLayerPosition,
    updateLayerSize: layerManipulation.updateLayerSize,
    updateLayerAnimation: layerManipulation.updateLayerAnimation,
  };
}
