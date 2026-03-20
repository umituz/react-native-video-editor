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
  Audio,
  ExportSettings,
  AspectRatio,
  LayerType,
  TransitionType,
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
  FilterPreset,
  SubtitleStyle,
  Subtitle,
} from "./domain/entities/video-project.types";

// =============================================================================
// INFRASTRUCTURE LAYER - Services & Constants
// =============================================================================

export { FILTER_PRESETS, DEFAULT_FILTER } from "./infrastructure/constants/filter.constants";
export { DEFAULT_PLAYBACK_RATE, SPEED_PRESETS } from "./infrastructure/constants/speed.constants";

export { layerOperationsService } from "./infrastructure/services/layer-operations.service";
export { sceneOperationsService } from "./infrastructure/services/scene-operations.service";
export { textLayerOperationsService } from "./infrastructure/services/text-layer-operations.service";
export { imageLayerOperationsService } from "./infrastructure/services/image-layer-operations.service";
export { shapeLayerOperationsService } from "./infrastructure/services/shape-layer-operations.service";
export { layerManipulationService } from "./infrastructure/services/layer-manipulation.service";

export { layerDeleteService } from "./infrastructure/services/layer-operations/layer-delete.service";
export { layerDuplicateService } from "./infrastructure/services/layer-operations/layer-duplicate.service";
export { layerOrderService } from "./infrastructure/services/layer-operations/layer-order.service";
export { layerTransformService } from "./infrastructure/services/layer-operations/layer-transform.service";

// =============================================================================
// PRESENTATION LAYER - Components & Hooks
// =============================================================================

export { VideoEditor } from "./VideoEditor";
export type { VideoEditorProps } from "./VideoEditor";

export { EditorHeader } from "./presentation/components/EditorHeader";
export { EditorPreviewArea } from "./presentation/components/EditorPreviewArea";
export { EditorToolPanel } from "./presentation/components/EditorToolPanel";
export { EditorTimeline } from "./presentation/components/EditorTimeline";
export { LayerActionsMenu } from "./presentation/components/LayerActionsMenu";
export { SceneActionsMenu } from "./presentation/components/SceneActionsMenu";
export { TextLayerEditor } from "./presentation/components/TextLayerEditor";
export { AudioEditor } from "./presentation/components/AudioEditor";
export { ShapeLayerEditor } from "./presentation/components/ShapeLayerEditor";
export { DraggableLayer } from "./presentation/components/DraggableLayer";
export { ImageLayerEditor } from "./presentation/components/ImageLayerEditor";
export { ExportDialog } from "./presentation/components/ExportDialog";
export { SpeedControlPanel } from "./presentation/components/SpeedControlPanel";
export { VideoFilterPicker } from "./presentation/components/VideoFilterPicker";
export { CollageEditorCanvas } from "./presentation/components/CollageEditorCanvas";
export { SubtitleTimeInput } from "./presentation/components/SubtitleTimeInput";
export { SubtitleStylePicker } from "./presentation/components/SubtitleStylePicker";
export { SubtitleOverlay } from "./presentation/components/SubtitleOverlay";
export { SubtitleListPanel } from "./presentation/components/SubtitleListPanel";

export { useEditorLayers } from "./presentation/hooks/useEditorLayers";
export { useEditorScenes } from "./presentation/hooks/useEditorScenes";
export { useEditorPlayback } from "./presentation/hooks/useEditorPlayback";
export { useEditorHistory } from "./presentation/hooks/useEditorHistory";
export { useEditorBottomSheet } from "./presentation/hooks/useEditorBottomSheet";
export { useEditorActions } from "./presentation/hooks/useEditorActions";
export { useTextLayerForm } from "./presentation/hooks/useTextLayerForm";
export { useImageLayerForm } from "./presentation/hooks/useImageLayerForm";
export { useShapeLayerForm } from "./presentation/hooks/useShapeLayerForm";
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
export { useCollageEditor } from "./presentation/hooks/useCollageEditor";
export type { UseCollageEditorReturn } from "./presentation/hooks/useCollageEditor";
export { useSubtitleEditor } from "./presentation/hooks/useSubtitleEditor";
export type { UseSubtitleEditorReturn } from "./presentation/hooks/useSubtitleEditor";

export { generateSRT, formatTimeDisplay, formatTimeDetailed } from "./infrastructure/utils/srt.utils";

// =============================================================================
// VIDEO PLAYER MODULE
// =============================================================================

export type {
  VideoPlayerConfig,
  VideoPlayerState,
  VideoPlayerControls,
  UseVideoPlayerControlResult,
  VideoVisibilityConfig,
  VideoPlayerProps,
  VideoPlayerType,
  PlaybackProgressState,
  ControlsAutoHideConfig,
  ControlsAutoHideResult,
  VideoProgressBarProps,
  VideoPlayerOverlayProps,
  FullScreenVideoPlayerProps,
} from "./player/index";

export {
  safePlay,
  safePause,
  safeToggle,
  isPlayerReady,
  configurePlayer,
  safeSeekTo,
  safeMute,
  safeReplay,
  useVideoPlayerControl,
  useVideoVisibility,
  useVideoPlaybackProgress,
  useControlsAutoHide,
  VideoPlayer,
  VideoProgressBar,
  VideoPlayerOverlay,
  FullScreenVideoPlayer,
} from "./player";
