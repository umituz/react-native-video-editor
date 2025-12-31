/**
 * useEditorActions Hook
 * Single Responsibility: Compose editor action handlers
 */

import type { VideoProject } from "../../../domain/entities";
import type { UseEditorLayersReturn } from "./useEditorLayers";
import type { UseEditorScenesReturn } from "./useEditorScenes";
import type { UseEditorBottomSheetReturn } from "./useEditorBottomSheet";
import { useLayerActions } from "./useLayerActions";
import { useSceneActions } from "./useSceneActions";
import { useMenuActions } from "./useMenuActions";
import { useExportActions } from "./useExportActions";

export interface UseEditorActionsParams {
  project: VideoProject | undefined;
  selectedLayerId: string | null;
  currentScene: any;
  layers: UseEditorLayersReturn;
  scenes: UseEditorScenesReturn;
  bottomSheet: UseEditorBottomSheetReturn;
  onExportComplete: (settings: any, uri?: string) => void;
}

export interface UseEditorActionsReturn {
  handleAddText: () => void;
  handleEditLayer: () => void;
  handleAddImage: () => void;
  handleEditImageLayer: (layerId: string) => void;
  handleAddShape: () => void;
  handleAudio: () => void;
  handleAnimate: (layerId: string) => void;
  handleLayerActionsPress: (layer: any) => void;
  handleSceneLongPress: (index: number) => void;
  handleExport: () => void;
  handleSave: () => void;
}

export function useEditorActions({
  project,
  selectedLayerId,
  currentScene,
  layers,
  scenes,
  bottomSheet,
  onExportComplete,
}: UseEditorActionsParams): UseEditorActionsReturn {
  const layerActions = useLayerActions({
    selectedLayerId,
    currentScene,
    layers,
    bottomSheet,
  });

  const sceneActions = useSceneActions({
    currentScene,
    scenes,
    bottomSheet,
  });

  const menuActions = useMenuActions({
    layers,
    bottomSheet,
    handleEditLayer: layerActions.handleEditLayer,
    handleEditImageLayer: layerActions.handleEditImageLayer,
    handleAnimate: layerActions.handleAnimate,
  });

  const exportActions = useExportActions({
    project,
    bottomSheet,
    onExportComplete,
  });

  const handleSceneLongPress = (index: number) => {
    if (!project) return;
    sceneActions.handleSceneLongPress(index, project.scenes.length > 1);
  };

  return {
    handleAddText: layerActions.handleAddText,
    handleEditLayer: layerActions.handleEditLayer,
    handleAddImage: layerActions.handleAddImage,
    handleEditImageLayer: layerActions.handleEditImageLayer,
    handleAddShape: layerActions.handleAddShape,
    handleAudio: sceneActions.handleAudio,
    handleAnimate: layerActions.handleAnimate,
    handleLayerActionsPress: menuActions.handleLayerActionsPress,
    handleSceneLongPress,
    handleExport: exportActions.handleExport,
    handleSave: exportActions.handleSave,
  };
}
