/**
 * Video Project Types
 * Core domain entities for video editor
 */

export type AspectRatio = "16:9" | "9:16" | "1:1" | "4:5";

export interface FilterPreset {
  readonly id: string;
  readonly name: string;
  readonly overlay: string;
  readonly opacity: number;
}

export type LayerType = "text" | "image" | "video" | "shape";

export interface SubtitleStyle {
  fontSize: "small" | "medium" | "large" | "extraLarge";
  fontColor: string;
  backgroundColor: string;
  position: "top" | "center" | "bottom";
}

export interface Subtitle {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  style: SubtitleStyle;
}

export type TransitionType = "fade" | "slide" | "zoom" | "wipe" | "none";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Transition {
  type: TransitionType;
  duration: number;
}

export interface Background {
  type: "color" | "image" | "video";
  value: string;
}

export interface TextLayer {
  id: string;
  type: "text";
  content: string;
  position: Position;
  size: Size;
  rotation: number;
  opacity: number;
  fontSize: number;
  fontFamily: string;
  fontWeight:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  color: string;
  textAlign: "left" | "center" | "right";
}

export interface ImageLayer {
  id: string;
  type: "image";
  uri: string;
  position: Position;
  size: Size;
  rotation: number;
  opacity: number;
}

export interface VideoLayer {
  id: string;
  type: "video";
  uri: string;
  position: Position;
  size: Size;
  rotation: number;
  opacity: number;
  startTime: number;
  endTime: number;
  volume: number;
}

export interface ShapeLayer {
  id: string;
  type: "shape";
  shape: "rectangle" | "circle" | "triangle";
  position: Position;
  size: Size;
  rotation: number;
  opacity: number;
  fillColor: string;
  borderColor?: string;
  borderWidth?: number;
}

export type Layer = TextLayer | ImageLayer | VideoLayer | ShapeLayer;

export interface Audio {
  uri: string;
  volume: number;
  startTime: number;
  fadeIn?: number;
  fadeOut?: number;
}

export interface Scene {
  id: string;
  duration: number;
  background: Background;
  layers: Layer[];
  transition: Transition;
  audio?: Audio;
  filter?: FilterPreset;
}

export interface ExportSettings {
  resolution: "720p" | "1080p" | "4k";
  format: "mp4" | "mov";
  quality: "low" | "medium" | "high";
  includeWatermark: boolean;
}

export interface VideoProject {
  id: string;
  templateId: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  duration: number;
  thumbnailUrl: string;
  aspectRatio: AspectRatio;
  scenes: Scene[];
  exportSettings: ExportSettings;
  folderId?: string;
  tags: string[];
}

// Editor State
export interface EditorState {
  project: VideoProject | null;
  currentSceneIndex: number;
  selectedLayerId: string | null;
  isPlaying: boolean;
  currentTime: number;
}

// Operation Results
export interface LayerOperationResult {
  success: boolean;
  updatedScenes: Scene[];
  error?: string;
}

export interface SceneOperationResult {
  success: boolean;
  updatedScenes: Scene[];
  newSceneIndex?: number;
  error?: string;
}

// Layer Actions
export type LayerOrderAction = "front" | "back" | "up" | "down";

// Layer Data
export interface AddTextLayerData {
  content?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: "left" | "center" | "right";
}

export interface AddImageLayerData {
  uri?: string;
  opacity?: number;
}

export interface AddShapeLayerData {
  shape?: string;
  opacity?: number;
  fillColor?: string;
  borderColor?: string;
  borderWidth?: number;
}
