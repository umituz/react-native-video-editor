/**
 * useLayerManipulation Hook
 * Single Responsibility: Layer manipulation operations (delete, order, duplicate, position, size, animation)
 */

import { useCallback } from "react";
import { Alert } from "react-native";
import { useLocalization } from "@umituz/react-native-settings";
import { layerOperationsService } from "../../infrastructure/services/layer-operations.service";
import type { Scene, LayerOrderAction, Animation } from "../../domain/entities";

export interface UseLayerManipulationParams {
  scenes: Scene[];
  sceneIndex: number;
  onUpdateScenes: (scenes: Scene[]) => void;
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
  const { t } = useLocalization();

  const deleteLayer = useCallback(
    (layerId: string) => {
      Alert.alert(
        t("editor.layers.delete.title"),
        t("editor.layers.delete.message"),
        [
          { text: t("common.buttons.cancel"), style: "cancel" },
          {
            text: t("editor.layers.delete.confirm"),
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
                Alert.alert(t("editor.layers.delete.success"));
              } else {
                Alert.alert(t("editor.layers.delete.error"));
              }
            },
          },
        ],
      );
    },
    [scenes, sceneIndex, onUpdateScenes, onLayerDeleted, t],
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
        Alert.alert(t("editor.layers.order.success"), t(`editor.layers.order.${action}`));
      } else {
        Alert.alert(t("editor.layers.order.error"));
      }
    },
    [scenes, sceneIndex, onUpdateScenes, t],
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
        Alert.alert(t("editor.layers.duplicate.success"));
      } else {
        Alert.alert(t("editor.layers.duplicate.error"));
      }
    },
    [scenes, sceneIndex, onUpdateScenes, t],
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
          t("editor.layers.animation.success"),
          t(animation
            ? "editor.layers.animation.applied"
            : "editor.layers.animation.removed"),
        );
      } else {
        Alert.alert(t("editor.layers.animation.error"));
      }
    },
    [scenes, sceneIndex, onUpdateScenes, onCloseBottomSheet, t],
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
