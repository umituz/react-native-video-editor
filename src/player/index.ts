/**
 * Video Player Module
 * Exports for video playback functionality
 */

// Types
export type {
  VideoPlayerConfig,
  VideoPlayerState,
  VideoPlayerControls,
  UseVideoPlayerControlResult,
  VideoVisibilityConfig,
  VideoPlayerProps,
  VideoPlayer as VideoPlayerType,
} from "./types";

// Services
export {
  safePlay,
  safePause,
  safeToggle,
  isPlayerReady,
  configurePlayer,
} from "./infrastructure/services/player-control.service";

// Hooks
export { useVideoPlayerControl } from "./presentation/hooks/useVideoPlayerControl";
export { useVideoVisibility } from "./presentation/hooks/useVideoVisibility";

// Components
export { VideoPlayer } from "./presentation/components/VideoPlayer";
