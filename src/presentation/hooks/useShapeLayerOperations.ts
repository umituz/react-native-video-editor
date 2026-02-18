/**
 * useShapeLayerOperations Hook
 * Single Responsibility: Shape layer operations (add)
 */

import { useCallback } from "react";
import { Alert } from "react-native";
import { useLocalization } from "@umituz/react-native-settings";
import { layerOperationsService } from "../../infrastructure/services/layer-operations.service";
import type { AddShapeLayerData, Scene } from "../../domain/entities";

interface UseShapeLayerOperationsParams {
  scenes: Scene[];
  sceneIndex: number;
  onUpdateScenes: (scenes: Scene[]) => void;
  onCloseBottomSheet: () => void;
  defaultColor: string;
}

interface UseShapeLayerOperationsReturn {
  addShapeLayer: (data: AddShapeLayerData) => void;
}

export function useShapeLayerOperations({
  scenes,
  sceneIndex,
  onUpdateScenes,
  onCloseBottomSheet,
  defaultColor,
}: UseShapeLayerOperationsParams): UseShapeLayerOperationsReturn {
  const { t } = useLocalization();

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
        Alert.alert(t("editor.layers.shape.add.success"));
      } else {
        Alert.alert(t("editor.layers.shape.add.error"));
      }
    },
    [scenes, sceneIndex, onUpdateScenes, onCloseBottomSheet, defaultColor, t],
  );

  return {
    addShapeLayer,
  };
}
