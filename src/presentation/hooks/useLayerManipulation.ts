/**
 * useLayerManipulation Hook
 * Single Responsibility: Layer manipulation operations (delete, order, duplicate, position, size, animation)
 */

import { useCallback } from "react";
import { Alert } from "react-native";
import { layerOperationsService } from "../infrastructure/services/layer-operations.service";
import type { LayerOrderAction } from "../types";
import type { Animation } from "@domains/video";

export interface UseLayerManipulationParams {
  scenes: any[];
  sceneIndex: number;
  onUpdateScenes: (scenes: any[]) => void;
  onCloseBottomSheet: () => void;
  onLayerDeleted?: () => void;
}

export interface UseLayerManipulationReturn {
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

export function useLayerManipulation({
  scenes,
  sceneIndex,
  onUpdateScenes,
  onCloseBottomSheet,
  onLayerDeleted,
}: UseLayerManipulationParams): UseLayerManipulationReturn {
  const deleteLayer = useCallback(
    (layerId: string) => {
      Alert.alert(
        "Delete Layer",
        "Are you sure you want to delete this layer?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              const result = layerOperationsService.deleteLayer(
                scenes,
                sceneIndex,
                layerId,
              );
              if (result.success) {
                onUpdateScenes(result.updatedScenes);
                onLayerDeleted?.();
                Alert.alert("Success", "Layer deleted");
              } else {
                Alert.alert("Error", result.error || "Failed to delete layer");
              }
            },
          },
        ],
      );
    },
    [scenes, sceneIndex, onUpdateScenes, onLayerDeleted],
  );

  const changeLayerOrder = useCallback(
    (layerId: string, action: LayerOrderAction) => {
      const result = layerOperationsService.changeLayerOrder(
        scenes,
        sceneIndex,
        layerId,
        action,
      );
      if (result.success) {
        onUpdateScenes(result.updatedScenes);
        const actionNames = {
          front: "Layer moved to front",
          back: "Layer moved to back",
          up: "Layer moved up",
          down: "Layer moved down",
        };
        Alert.alert("Success", actionNames[action]);
      } else {
        Alert.alert("Error", result.error || "Failed to change layer order");
      }
    },
    [scenes, sceneIndex, onUpdateScenes],
  );

  const duplicateLayer = useCallback(
    (layerId: string) => {
      const result = layerOperationsService.duplicateLayer(
        scenes,
        sceneIndex,
        layerId,
      );
      if (result.success) {
        onUpdateScenes(result.updatedScenes);
        Alert.alert("Success", "Layer duplicated!");
      } else {
        Alert.alert("Error", result.error || "Failed to duplicate layer");
      }
    },
    [scenes, sceneIndex, onUpdateScenes],
  );

  const updateLayerPosition = useCallback(
    (layerId: string, x: number, y: number) => {
      const result = layerOperationsService.updateLayerPosition(
        scenes,
        sceneIndex,
        layerId,
        x,
        y,
      );
      if (result.success) {
        onUpdateScenes(result.updatedScenes);
      }
    },
    [scenes, sceneIndex, onUpdateScenes],
  );

  const updateLayerSize = useCallback(
    (layerId: string, width: number, height: number) => {
      const result = layerOperationsService.updateLayerSize(
        scenes,
        sceneIndex,
        layerId,
        width,
        height,
      );
      if (result.success) {
        onUpdateScenes(result.updatedScenes);
      }
    },
    [scenes, sceneIndex, onUpdateScenes],
  );

  const updateLayerAnimation = useCallback(
    (layerId: string, animation: Animation | undefined) => {
      const result = layerOperationsService.updateLayerAnimation(
        scenes,
        sceneIndex,
        layerId,
        animation,
      );
      if (result.success) {
        onUpdateScenes(result.updatedScenes);
        onCloseBottomSheet();
        Alert.alert(
          "Success",
          animation
            ? "Animation applied to layer!"
            : "Animation removed from layer",
        );
      } else {
        Alert.alert(
          "Error",
          result.error || "Failed to update layer animation",
        );
      }
    },
    [scenes, sceneIndex, onUpdateScenes, onCloseBottomSheet],
  );

  return {
    deleteLayer,
    changeLayerOrder,
    duplicateLayer,
    updateLayerPosition,
    updateLayerSize,
    updateLayerAnimation,
  };
}
