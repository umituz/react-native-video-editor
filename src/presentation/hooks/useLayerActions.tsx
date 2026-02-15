/**
 * useLayerActions Hook
 * Single Responsibility: Layer action handlers (add, edit, animate)
 */

import { useCallback } from "react";
import { useLocalization } from "@umituz/react-native-settings";
import { TextLayerEditor } from "../components/TextLayerEditor";
import { ImageLayerEditor } from "../components/ImageLayerEditor";
import { ShapeLayerEditor } from "../components/ShapeLayerEditor";
import { AnimationEditor } from "../components/AnimationEditor";
import type { Scene, ImageLayer, Layer } from "../../domain/entities";
import type { UseEditorLayersReturn } from "./useEditorLayers";
import type { UseEditorBottomSheetReturn } from "./useEditorBottomSheet";

export interface UseLayerActionsParams {
  selectedLayerId: string | null;
  currentScene: Scene | undefined;
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
  const { t } = useLocalization();
  const { openBottomSheet, closeBottomSheet } = bottomSheet;

  const handleAddText = useCallback(() => {
    openBottomSheet({
      title: t("editor.layers.text.add"),
      children: (
        <TextLayerEditor
          onSave={layers.addTextLayer}
          onCancel={closeBottomSheet}
        />
      ),
    });
  }, [layers.addTextLayer, openBottomSheet, closeBottomSheet, t]);

  const handleEditLayer = useCallback(() => {
    if (!selectedLayerId || !currentScene) return;
    const layer = currentScene.layers.find(
      (l: Layer) => l.id === selectedLayerId,
    );
    if (!layer || layer.type !== "text") return;

    openBottomSheet({
      title: t("editor.layers.text.edit"),
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
    t,
  ]);

  const handleAddImage = useCallback(() => {
    openBottomSheet({
      title: t("editor.layers.image.add"),
      children: (
        <ImageLayerEditor
          onSave={layers.addImageLayer}
          onCancel={closeBottomSheet}
        />
      ),
    });
  }, [layers.addImageLayer, openBottomSheet, closeBottomSheet, t]);

  const handleEditImageLayer = useCallback(
    (layerId: string) => {
      if (!currentScene) return;
      const layer = currentScene.layers.find((l: Layer) => l.id === layerId) as
        | ImageLayer
        | undefined;
      if (!layer) return;

      openBottomSheet({
        title: t("editor.layers.image.edit"),
        children: (
          <ImageLayerEditor
            layer={layer}
            onSave={(data) => layers.editImageLayer(layerId, data)}
            onCancel={closeBottomSheet}
          />
        ),
      });
    },
    [currentScene, layers.editImageLayer, openBottomSheet, closeBottomSheet, t],
  );

  const handleAddShape = useCallback(() => {
    openBottomSheet({
      title: t("editor.layers.shape.add"),
      children: (
        <ShapeLayerEditor
          onSave={layers.addShapeLayer}
          onCancel={closeBottomSheet}
        />
      ),
    });
  }, [layers.addShapeLayer, openBottomSheet, closeBottomSheet, t]);

  const handleAnimate = useCallback(
    (layerId: string) => {
      if (!currentScene) return;
      const layer = currentScene.layers.find((l: Layer) => l.id === layerId);
      if (!layer) return;

      openBottomSheet({
        title: layer.animation
          ? t("editor.layers.animation.edit")
          : t("editor.layers.animation.add"),
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
      t,
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
