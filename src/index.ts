/**
 * @umituz/react-native-video-editor
 * Professional video editor with layer-based timeline
 */

// =============================================================================
// DOMAIN LAYER - Types & Interfaces
// =============================================================================

export type {
  VideoProject,
  Scene,
  Layer,
  TextLayer,
  ImageLayer,
  VideoLayer,
  ShapeLayer,
  Animation,
  Audio,
  ExportSettings,
  AspectRatio,
  LayerType,
  TransitionType,
  AnimationType,
  Position,
  Size,
  Transition,
  Background,
  EditorState,
  LayerOperationResult,
  SceneOperationResult,
  LayerOrderAction,
  AddTextLayerData,
  AddImageLayerData,
  AddShapeLayerData,
} from "./domain/entities";

// =============================================================================
// INFRASTRUCTURE LAYER - Services & Constants
// =============================================================================

export * from "./infrastructure/constants";

export { layerOperationsService } from "./infrastructure/services/layer-operations.service";
export { sceneOperationsService } from "./infrastructure/services/scene-operations.service";
export { textLayerOperationsService } from "./infrastructure/services/text-layer-operations.service";
export { imageLayerOperationsService } from "./infrastructure/services/image-layer-operations.service";
export { shapeLayerOperationsService } from "./infrastructure/services/shape-layer-operations.service";
export { layerManipulationService } from "./infrastructure/services/layer-manipulation.service";

export {
  layerDeleteService,
  layerDuplicateService,
  layerOrderService,
  layerTransformService,
} from "./infrastructure/services/layer-operations";

// =============================================================================
// PRESENTATION LAYER - Components & Hooks
// =============================================================================

export {
  EditorHeader,
  EditorPreviewArea,
  EditorToolPanel,
  EditorTimeline,
  LayerActionsMenu,
  SceneActionsMenu,
  TextLayerEditor,
  AudioEditor,
  ShapeLayerEditor,
  AnimationEditor,
  DraggableLayer,
  ImageLayerEditor,
  ExportDialog,
} from "./presentation/components";

export { useEditorLayers } from "./presentation/hooks/useEditorLayers";
export { useEditorScenes } from "./presentation/hooks/useEditorScenes";
export { useEditorPlayback } from "./presentation/hooks/useEditorPlayback";
export { useEditorHistory } from "./presentation/hooks/useEditorHistory";
export { useEditorBottomSheet } from "./presentation/hooks/useEditorBottomSheet";
export { useEditorActions } from "./presentation/hooks/useEditorActions";
export { useTextLayerForm } from "./presentation/hooks/useTextLayerForm";
export { useImageLayerForm } from "./presentation/hooks/useImageLayerForm";
export { useShapeLayerForm } from "./presentation/hooks/useShapeLayerForm";
export { useAnimationLayerForm } from "./presentation/hooks/useAnimationLayerForm";
export { useAudioLayerForm } from "./presentation/hooks/useAudioLayerForm";
export { useTextLayerOperations } from "./presentation/hooks/useTextLayerOperations";
export { useImageLayerOperations } from "./presentation/hooks/useImageLayerOperations";
export { useShapeLayerOperations } from "./presentation/hooks/useShapeLayerOperations";
export { useLayerManipulation } from "./presentation/hooks/useLayerManipulation";
export { useDraggableLayerGestures } from "./presentation/hooks/useDraggableLayerGestures";
export { useExport } from "./presentation/hooks/useExport";
export { useExportForm } from "./presentation/hooks/useExportForm";
export { useLayerActions } from "./presentation/hooks/useLayerActions";
export { useSceneActions } from "./presentation/hooks/useSceneActions";
export { useMenuActions } from "./presentation/hooks/useMenuActions";
export { useExportActions } from "./presentation/hooks/useExportActions";
