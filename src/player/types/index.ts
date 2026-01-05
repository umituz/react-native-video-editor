/**
 * Video Player Types
 * Core type definitions for video playback functionality
 */

import type { VideoPlayer } from "expo-video";
import type { ViewStyle } from "react-native";

/**
 * Configuration for video player initialization
 */
export interface VideoPlayerConfig {
  readonly source: string | null;
  readonly loop?: boolean;
  readonly muted?: boolean;
  readonly autoPlay?: boolean;
}

/**
 * Current state of the video player
 */
export interface VideoPlayerState {
  readonly isPlaying: boolean;
  readonly isPlayerValid: boolean;
  readonly isLoading: boolean;
}

/**
 * Video player control actions
 */
export interface VideoPlayerControls {
  readonly play: () => void;
  readonly pause: () => void;
  readonly toggle: () => void;
}

/**
 * Combined hook return type
 */
export interface UseVideoPlayerControlResult {
  readonly player: VideoPlayer | null;
  readonly state: VideoPlayerState;
  readonly controls: VideoPlayerControls;
}

/**
 * Visibility hook configuration
 */
export interface VideoVisibilityConfig {
  readonly isVisible: boolean;
  readonly player: VideoPlayer | null;
  readonly isPlayerValid: boolean;
  readonly onPlayingChange?: (isPlaying: boolean) => void;
}

/**
 * Video player component props
 */
export interface VideoPlayerProps {
  readonly source: string | null;
  readonly isVisible?: boolean;
  readonly loop?: boolean;
  readonly muted?: boolean;
  readonly autoPlay?: boolean;
  readonly showControls?: boolean;
  readonly nativeControls?: boolean;
  readonly onPlayingChange?: (isPlaying: boolean) => void;
  readonly onError?: (error: Error) => void;
  readonly style?: ViewStyle;
  readonly contentFit?: "contain" | "cover" | "fill";
  readonly thumbnailUrl?: string;
}

export type { VideoPlayer } from "expo-video";

/**
 * Video caching types
 */
export type {
  VideoDownloadProgressCallback,
  VideoCacheResult,
} from "../infrastructure/services/video-cache.service";
export type { VideoCachingState } from "../presentation/hooks/useVideoCaching";
