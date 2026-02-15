/**
 * useImageLayerOperations Hook
 * Single Responsibility: Image layer operations (add, edit)
 */

import { useCallback } from "react";
import { Alert } from "react-native";
import { useLocalization } from "@umituz/react-native-settings";
import { layerOperationsService } from "../../infrastructure/services/layer-operations.service";
import type { AddImageLayerData, Scene, ImageLayer } from "../../domain/entities";

export interface UseImageLayerOperationsParams {
  scenes: Scene[];
  sceneIndex: number;
  onUpdateScenes: (scenes: Scene[]) => void;
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
  const { t } = useLocalization();

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
        Alert.alert(t("editor.layers.image.add.success"));
      } else {
        Alert.alert(t("editor.layers.image.add.error"));
      }
    },
    [scenes, sceneIndex, onUpdateScenes, onCloseBottomSheet, t],
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
        Alert.alert(t("editor.layers.image.update.success"));
      } else {
        Alert.alert(t("editor.layers.image.update.error"));
      }
    },
    [scenes, sceneIndex, onUpdateScenes, onCloseBottomSheet, t],
  );

  return {
    addImageLayer,
    editImageLayer,
  };
}
