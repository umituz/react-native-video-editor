/**
 * useTextLayerOperations Hook
 * Single Responsibility: Text layer operations (add, edit)
 */

import { useCallback } from "react";
import { Alert } from "react-native";
import { layerOperationsService } from "../infrastructure/services/layer-operations.service";
import type { AddTextLayerData } from "../types";
import type { TextLayer } from "@domains/video";

export interface UseTextLayerOperationsParams {
  scenes: any[];
  sceneIndex: number;
  onUpdateScenes: (scenes: any[]) => void;
  onCloseBottomSheet: () => void;
  defaultColor: string;
}

export interface UseTextLayerOperationsReturn {
  addTextLayer: (data: AddTextLayerData) => void;
  editTextLayer: (layerId: string, data: Partial<TextLayer>) => void;
}

export function useTextLayerOperations({
  scenes,
  sceneIndex,
  onUpdateScenes,
  onCloseBottomSheet,
  defaultColor,
}: UseTextLayerOperationsParams): UseTextLayerOperationsReturn {
  const addTextLayer = useCallback(
    (data: AddTextLayerData) => {
      const result = layerOperationsService.addTextLayer(
        scenes,
        sceneIndex,
        data,
        defaultColor,
      );
      if (result.success) {
        onUpdateScenes(result.updatedScenes);
        onCloseBottomSheet();
        Alert.alert("Success", "Text layer added!");
      } else {
        Alert.alert("Error", result.error || "Failed to add text layer");
      }
    },
    [scenes, sceneIndex, onUpdateScenes, onCloseBottomSheet, defaultColor],
  );

  const editTextLayer = useCallback(
    (layerId: string, data: Partial<TextLayer>) => {
      const result = layerOperationsService.editTextLayer(
        scenes,
        sceneIndex,
        layerId,
        data,
      );
      if (result.success) {
        onUpdateScenes(result.updatedScenes);
        onCloseBottomSheet();
        Alert.alert("Success", "Text layer updated!");
      } else {
        Alert.alert("Error", result.error || "Failed to update text layer");
      }
    },
    [scenes, sceneIndex, onUpdateScenes, onCloseBottomSheet],
  );

  return {
    addTextLayer,
    editTextLayer,
  };
}
