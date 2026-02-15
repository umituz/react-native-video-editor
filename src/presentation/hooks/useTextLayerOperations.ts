/**
 * useTextLayerOperations Hook
 * Single Responsibility: Text layer operations (add, edit)
 */

import { useCallback } from "react";
import { Alert } from "react-native";
import { useLocalization } from "@umituz/react-native-settings";
import { layerOperationsService } from "../../infrastructure/services/layer-operations.service";
import type { AddTextLayerData, Scene, TextLayer } from "../../domain/entities";

export interface UseTextLayerOperationsParams {
  scenes: Scene[];
  sceneIndex: number;
  onUpdateScenes: (scenes: Scene[]) => void;
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
  const { t } = useLocalization();

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
        Alert.alert(t("editor.layers.text.add.success"));
      } else {
        Alert.alert(t("editor.layers.text.add.error"));
      }
    },
    [scenes, sceneIndex, onUpdateScenes, onCloseBottomSheet, defaultColor, t],
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
        Alert.alert(t("editor.layers.text.update.success"));
      } else {
        Alert.alert(t("editor.layers.text.update.error"));
      }
    },
    [scenes, sceneIndex, onUpdateScenes, onCloseBottomSheet, t],
  );

  return {
    addTextLayer,
    editTextLayer,
  };
}
