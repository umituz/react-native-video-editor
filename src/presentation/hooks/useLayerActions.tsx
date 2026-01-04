/**
 * useLayerActions Hook
 * Single Responsibility: Layer action handlers (add, edit, animate)
 */

import { useCallback } from "react";
import { TextLayerEditor } from "../components/TextLayerEditor";
import { ImageLayerEditor } from "../components/ImageLayerEditor";
import { ShapeLayerEditor } from "../components/ShapeLayerEditor";
import { AnimationEditor } from "../components/AnimationEditor";
import type { ImageLayer } from "../../domain/entities";
import type { UseEditorLayersReturn } from "./useEditorLayers";
import type { UseEditorBottomSheetReturn } from "./useEditorBottomSheet";

export interface UseLayerActionsParams {
  selectedLayerId: string | null;
  currentScene: any;
  layers: UseEditorLayersReturn;
  bottomSheet: UseEditorBottomSheetReturn;
}

export interface UseLayerActionsReturn {
  handleAddText: () => void;
  handleEditLayer: () => void;
  handleAddImage: () => void;
  handleEditImageLayer: (layerId: string) => void;
  handleAddShape: () => void;
  handleAnimate: (layerId: string) => void;
}

export function useLayerActions({
  selectedLayerId,
  currentScene,
  layers,
  bottomSheet,
}: UseLayerActionsParams): UseLayerActionsReturn {
  const { openBottomSheet, closeBottomSheet } = bottomSheet;

  const handleAddText = useCallback(() => {
    openBottomSheet({
      title: "Add Text Layer",
      children: (
        <TextLayerEditor
          onSave={layers.addTextLayer}
          onCancel={closeBottomSheet}
        />
      ),
    });
  }, [layers.addTextLayer, openBottomSheet, closeBottomSheet]);

  const handleEditLayer = useCallback(() => {
    if (!selectedLayerId || !currentScene) return;
    const layer = currentScene.layers.find(
      (l: any) => l.id === selectedLayerId,
    );
    if (!layer || layer.type !== "text") return;

    openBottomSheet({
      title: "Edit Text Layer",
      children: (
        <TextLayerEditor
          layer={layer}
          onSave={(data) => layers.editTextLayer(selectedLayerId, data)}
          onCancel={closeBottomSheet}
        />
      ),
    });
  }, [
    selectedLayerId,
    currentScene,
    layers.editTextLayer,
    openBottomSheet,
    closeBottomSheet,
  ]);

  const handleAddImage = useCallback(() => {
    openBottomSheet({
      title: "Add Image Layer",
      children: (
        <ImageLayerEditor
          onSave={layers.addImageLayer}
          onCancel={closeBottomSheet}
        />
      ),
    });
  }, [layers.addImageLayer, openBottomSheet, closeBottomSheet]);

  const handleEditImageLayer = useCallback(
    (layerId: string) => {
      if (!currentScene) return;
      const layer = currentScene.layers.find((l: any) => l.id === layerId) as
        | ImageLayer
        | undefined;
      if (!layer) return;

      openBottomSheet({
        title: "Edit Image Layer",
        children: (
          <ImageLayerEditor
            layer={layer}
            onSave={(data) => layers.editImageLayer(layerId, data)}
            onCancel={closeBottomSheet}
          />
        ),
      });
    },
    [currentScene, layers.editImageLayer, openBottomSheet, closeBottomSheet],
  );

  const handleAddShape = useCallback(() => {
    openBottomSheet({
      title: "Add Shape Layer",
      children: (
        <ShapeLayerEditor
          onSave={layers.addShapeLayer}
          onCancel={closeBottomSheet}
        />
      ),
    });
  }, [layers.addShapeLayer, openBottomSheet, closeBottomSheet]);

  const handleAnimate = useCallback(
    (layerId: string) => {
      if (!currentScene) return;
      const layer = currentScene.layers.find((l: any) => l.id === layerId);
      if (!layer) return;

      openBottomSheet({
        title: layer.animation ? "Edit Animation" : "Add Animation",
        children: (
          <AnimationEditor
            animation={layer.animation}
            onSave={(animation) =>
              layers.updateLayerAnimation(layerId, animation)
            }
            onRemove={
              layer.animation
                ? () => layers.updateLayerAnimation(layerId, undefined)
                : undefined
            }
            onCancel={closeBottomSheet}
          />
        ),
      });
    },
    [
      currentScene,
      layers.updateLayerAnimation,
      openBottomSheet,
      closeBottomSheet,
    ],
  );

  return {
    handleAddText,
    handleEditLayer,
    handleAddImage,
    handleEditImageLayer,
    handleAddShape,
    handleAnimate,
  };
}
