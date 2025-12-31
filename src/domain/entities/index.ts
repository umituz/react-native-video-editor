/**
 * Editor Domain Types
 */

export * from "./video-project.types";

import type { VideoProject, Scene } from "./video-project.types";

export interface EditorState {
  project: VideoProject | null;
  currentSceneIndex: number;
  selectedLayerId: string | null;
  isPlaying: boolean;
  currentTime: number;
}

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

export type LayerOrderAction = "front" | "back" | "up" | "down";

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
