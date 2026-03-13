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
  readonly playbackRate?: number;
}

/**
 * Current state of the video player
 */
export interface VideoPlayerState {
  readonly isPlaying: boolean;
  readonly isPlayerValid: boolean;
  readonly isLoading: boolean;
  readonly playbackRate: number;
  readonly isMuted: boolean;
  readonly currentTime: number;
  readonly duration: number;
  readonly progress: number;
}

/**
 * Video player control actions
 */
export interface VideoPlayerControls {
  readonly play: () => void;
  readonly pause: () => void;
  readonly toggle: () => void;
  readonly setPlaybackRate: (rate: number) => void;
  readonly toggleMute: () => void;
  readonly setMuted: (muted: boolean) => void;
  readonly seekTo: (seconds: number) => void;
  readonly replay: () => void;
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
  readonly loop?: boolean;
  readonly muted?: boolean;
  readonly autoPlay?: boolean;
  /** When true, shows custom overlay controls and disables nativeControls */
  readonly showControls?: boolean;
  /** Native video controls (ignored when showControls is true) */
  readonly nativeControls?: boolean;
  readonly style?: ViewStyle;
  readonly contentFit?: "contain" | "cover" | "fill";
  readonly thumbnailUrl?: string;
  readonly playbackRate?: number;
  readonly filterOverlay?: { overlay: string; opacity: number };
  readonly title?: string;
  readonly subtitle?: string;
  readonly onBack?: () => void;
  readonly onProgress?: (currentTime: number, duration: number) => void;
}

/**
 * Playback progress state
 */
export interface PlaybackProgressState {
  readonly currentTime: number;
  readonly duration: number;
  readonly progress: number;
}

/**
 * Controls auto-hide configuration
 */
export interface ControlsAutoHideConfig {
  readonly autoHideDelay?: number;
  readonly isPlaying: boolean;
}

/**
 * Controls auto-hide result
 */
export interface ControlsAutoHideResult {
  readonly visible: boolean;
  readonly show: () => void;
  readonly hide: () => void;
  readonly toggle: () => void;
}

/**
 * Video progress bar props
 */
export interface VideoProgressBarProps {
  readonly currentTime: number;
  readonly duration: number;
  readonly onSeek?: (seconds: number) => void;
  readonly showTimeLabels?: boolean;
  readonly height?: number;
  readonly trackColor?: string;
  readonly fillColor?: string;
  readonly style?: ViewStyle;
}

/**
 * Video player overlay props
 */
export interface VideoPlayerOverlayProps {
  readonly visible: boolean;
  readonly isPlaying: boolean;
  readonly isMuted: boolean;
  readonly currentTime: number;
  readonly duration: number;
  readonly title?: string;
  readonly subtitle?: string;
  readonly onTogglePlay: () => void;
  readonly onToggleMute: () => void;
  readonly onSeek: (seconds: number) => void;
  readonly onBack?: () => void;
  readonly onTap: () => void;
}

/**
 * Full screen video player props
 */
export interface FullScreenVideoPlayerProps {
  readonly visible: boolean;
  readonly source: string | null;
  readonly title?: string;
  readonly subtitle?: string;
  readonly thumbnailUrl?: string;
  readonly onClose: () => void;
  readonly loop?: boolean;
  readonly autoPlay?: boolean;
}

export type { VideoPlayer } from "expo-video";

/**
 * Video caching types
 */
export type {
  VideoDownloadProgressCallback,
  VideoCacheResult,
} from "./infrastructure/services/video-cache.service";

export type { VideoCachingState } from "./presentation/hooks/useVideoCaching";
