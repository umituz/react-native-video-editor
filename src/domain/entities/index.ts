/**
 * Editor Domain Types
 */

export * from "./video-project.types";

export interface EditorState {
  project: import("./video-project.types").VideoProject | null;
  currentSceneIndex: number;
  selectedLayerId: string | null;
  isPlaying: boolean;
  currentTime: number;
}

export interface LayerOperationResult {
  success: boolean;
  updatedScenes: import("./video-project.types").Scene[];
  error?: string;
}

export interface SceneOperationResult {
  success: boolean;
  updatedScenes: import("./video-project.types").Scene[];
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
