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
  VideoDownloadProgressCallback,
  VideoCacheResult,
  VideoCachingState,
} from "./types";

// Services
export {
  safePlay,
  safePause,
  safeToggle,
  isPlayerReady,
  configurePlayer,
} from "./infrastructure/services/player-control.service";

export {
  isVideoCached,
  getCachedVideoUri,
  downloadVideo,
  getOrDownloadVideo,
  clearVideoCache,
  deleteSpecificCachedVideo,
} from "./infrastructure/services/video-cache.service";

// Hooks
export { useVideoPlayerControl } from "./presentation/hooks/useVideoPlayerControl";
export { useVideoVisibility } from "./presentation/hooks/useVideoVisibility";
export { useVideoCaching } from "./presentation/hooks/useVideoCaching";

// Components
export { VideoPlayer } from "./presentation/components/VideoPlayer";
