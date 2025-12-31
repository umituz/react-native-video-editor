/**
 * useShapeLayerOperations Hook
 * Single Responsibility: Shape layer operations (add)
 */

import { useCallback } from "react";
import { Alert } from "react-native";
import { layerOperationsService } from "../infrastructure/services/layer-operations.service";
import type { AddShapeLayerData } from "../types";

export interface UseShapeLayerOperationsParams {
  scenes: any[];
  sceneIndex: number;
  onUpdateScenes: (scenes: any[]) => void;
  onCloseBottomSheet: () => void;
  defaultColor: string;
}

export interface UseShapeLayerOperationsReturn {
  addShapeLayer: (data: AddShapeLayerData) => void;
}

export function useShapeLayerOperations({
  scenes,
  sceneIndex,
  onUpdateScenes,
  onCloseBottomSheet,
  defaultColor,
}: UseShapeLayerOperationsParams): UseShapeLayerOperationsReturn {
  const addShapeLayer = useCallback(
    (data: AddShapeLayerData) => {
      const result = layerOperationsService.addShapeLayer(
        scenes,
        sceneIndex,
        data,
        defaultColor,
      );
      if (result.success) {
        onUpdateScenes(result.updatedScenes);
        onCloseBottomSheet();
        Alert.alert("Success", "Shape layer added!");
      } else {
        Alert.alert("Error", result.error || "Failed to add shape layer");
      }
    },
    [scenes, sceneIndex, onUpdateScenes, onCloseBottomSheet, defaultColor],
  );

  return {
    addShapeLayer,
  };
}
