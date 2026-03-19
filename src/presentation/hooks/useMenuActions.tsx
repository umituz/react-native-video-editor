/**
 * useMenuActions Hook
 * Single Responsibility: Menu action handlers (layer actions menu)
 * MEMORY: Properly cleans up timers to prevent memory leaks
 */

import { useCallback, useEffect, useRef } from "react";
import { LayerActionsMenu } from "../components/LayerActionsMenu";
import type { Layer } from "../../domain/entities/video-project.types";
import type { UseEditorLayersReturn } from "./useEditorLayers";
import type { UseEditorBottomSheetReturn } from "./useEditorBottomSheet";

interface UseMenuActionsParams {
  layers: UseEditorLayersReturn;
  bottomSheet: UseEditorBottomSheetReturn;
  handleEditLayer: () => void;
  handleEditImageLayer: (layerId: string) => void;
  handleAnimate: (layerId: string) => void;
}

interface UseMenuActionsReturn {
  handleLayerActionsPress: (layer: Layer) => void;
}

export function useMenuActions({
  layers,
  bottomSheet,
  handleEditLayer,
  handleEditImageLayer,
  handleAnimate,
}: UseMenuActionsParams): UseMenuActionsReturn {
  const { openBottomSheet, closeBottomSheet } = bottomSheet;

  // MEMORY: Track all timers for cleanup
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // MEMORY: Clean up all timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  const handleLayerActionsPress = useCallback(
    (layer: Layer) => {
      openBottomSheet({
        title: "Layer Actions",
        children: (
          <LayerActionsMenu
            layer={layer}
            onEditText={() => {
              closeBottomSheet();
              const timer = setTimeout(() => handleEditLayer(), 300);
              timersRef.current.push(timer);
            }}
            onEditImage={() => {
              closeBottomSheet();
              const timer = setTimeout(() => handleEditImageLayer(layer.id), 300);
              timersRef.current.push(timer);
            }}
            onAnimate={() => {
              closeBottomSheet();
              const timer = setTimeout(() => handleAnimate(layer.id), 300);
              timersRef.current.push(timer);
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
