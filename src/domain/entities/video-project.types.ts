/**
 * Video Project Types
 * Core domain entities for video editor
 */

export type AspectRatio = "16:9" | "9:16" | "1:1" | "4:5";

export type LayerType = "text" | "image" | "video" | "shape";

export type TransitionType = "fade" | "slide" | "zoom" | "wipe" | "none";

export type AnimationType =
  | "fade"
  | "slide"
  | "bounce"
  | "zoom"
  | "rotate"
  | "none";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Animation {
  type: AnimationType;
  duration: number;
  delay?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
}

export interface Transition {
  type: TransitionType;
  duration: number;
}

export interface Background {
  type: "color" | "gradient" | "image" | "video";
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
  animation?: Animation;
}

export interface ImageLayer {
  id: string;
  type: "image";
  uri: string;
  position: Position;
  size: Size;
  rotation: number;
  opacity: number;
  animation?: Animation;
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
  animation?: Animation;
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
  animation?: Animation;
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
