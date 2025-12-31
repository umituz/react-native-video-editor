/**
 * useImageLayerOperations Hook
 * Single Responsibility: Image layer operations (add, edit)
 */

import { useCallback } from "react";
import { Alert } from "react-native";
import { layerOperationsService } from "../infrastructure/services/layer-operations.service";
import type { AddImageLayerData } from "../types";
import type { ImageLayer } from "@domains/video";

export interface UseImageLayerOperationsParams {
  scenes: any[];
  sceneIndex: number;
  onUpdateScenes: (scenes: any[]) => void;
  onCloseBottomSheet: () => void;
}

export interface UseImageLayerOperationsReturn {
  addImageLayer: (data: AddImageLayerData) => void;
  editImageLayer: (layerId: string, data: Partial<ImageLayer>) => void;
}

export function useImageLayerOperations({
  scenes,
  sceneIndex,
  onUpdateScenes,
  onCloseBottomSheet,
}: UseImageLayerOperationsParams): UseImageLayerOperationsReturn {
  const addImageLayer = useCallback(
    (data: AddImageLayerData) => {
      const result = layerOperationsService.addImageLayer(
        scenes,
        sceneIndex,
        data,
      );
      if (result.success) {
        onUpdateScenes(result.updatedScenes);
        onCloseBottomSheet();
        Alert.alert("Success", "Image layer added!");
      } else {
        Alert.alert("Error", result.error || "Failed to add image layer");
      }
    },
    [scenes, sceneIndex, onUpdateScenes, onCloseBottomSheet],
  );

  const editImageLayer = useCallback(
    (layerId: string, data: Partial<ImageLayer>) => {
      const result = layerOperationsService.editImageLayer(
        scenes,
        sceneIndex,
        layerId,
        data,
      );
      if (result.success) {
        onUpdateScenes(result.updatedScenes);
        onCloseBottomSheet();
        Alert.alert("Success", "Image layer updated!");
      } else {
        Alert.alert("Error", result.error || "Failed to update image layer");
      }
    },
    [scenes, sceneIndex, onUpdateScenes, onCloseBottomSheet],
  );

  return {
    addImageLayer,
    editImageLayer,
  };
}
