/**
 * useMenuActions Hook
 * Single Responsibility: Menu action handlers (layer actions menu)
 */

import { useCallback } from "react";
import { LayerActionsMenu } from "../presentation/components/LayerActionsMenu";
import type { UseEditorLayersReturn } from "./useEditorLayers";
import type { UseEditorBottomSheetReturn } from "./useEditorBottomSheet";

export interface UseMenuActionsParams {
  layers: UseEditorLayersReturn;
  bottomSheet: UseEditorBottomSheetReturn;
  handleEditLayer: () => void;
  handleEditImageLayer: (layerId: string) => void;
  handleAnimate: (layerId: string) => void;
}

export interface UseMenuActionsReturn {
  handleLayerActionsPress: (layer: any) => void;
}

export function useMenuActions({
  layers,
  bottomSheet,
  handleEditLayer,
  handleEditImageLayer,
  handleAnimate,
}: UseMenuActionsParams): UseMenuActionsReturn {
  const { openBottomSheet, closeBottomSheet } = bottomSheet;

  const handleLayerActionsPress = useCallback(
    (layer: any) => {
      openBottomSheet({
        title: "Layer Actions",
        children: (
          <LayerActionsMenu
            layer={layer}
            onEditText={() => {
              closeBottomSheet();
              setTimeout(() => handleEditLayer(), 300);
            }}
            onEditImage={() => {
              closeBottomSheet();
              setTimeout(() => handleEditImageLayer(layer.id), 300);
            }}
            onAnimate={() => {
              closeBottomSheet();
              setTimeout(() => handleAnimate(layer.id), 300);
            }}
            onDuplicate={() => {
              closeBottomSheet();
              layers.duplicateLayer(layer.id);
            }}
            onMoveFront={() => {
              closeBottomSheet();
              layers.changeLayerOrder(layer.id, "front");
            }}
            onMoveUp={() => {
              closeBottomSheet();
              layers.changeLayerOrder(layer.id, "up");
            }}
            onMoveDown={() => {
              closeBottomSheet();
              layers.changeLayerOrder(layer.id, "down");
            }}
            onMoveBack={() => {
              closeBottomSheet();
              layers.changeLayerOrder(layer.id, "back");
            }}
            onDelete={() => {
              closeBottomSheet();
              layers.deleteLayer(layer.id);
            }}
          />
        ),
      });
    },
    [
      layers,
      handleEditLayer,
      handleEditImageLayer,
      handleAnimate,
      openBottomSheet,
      closeBottomSheet,
    ],
  );

  return {
    handleLayerActionsPress,
  };
}
