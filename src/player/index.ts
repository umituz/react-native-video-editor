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
  PlaybackProgressState,
  ControlsAutoHideConfig,
  ControlsAutoHideResult,
  VideoProgressBarProps,
  VideoPlayerOverlayProps,
  FullScreenVideoPlayerProps,
} from "./types";

// Services
export {
  safePlay,
  safePause,
  safeToggle,
  isPlayerReady,
  configurePlayer,
  safeSeekTo,
  safeMute,
  safeReplay,
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
export { useVideoPlaybackProgress } from "./presentation/hooks/useVideoPlaybackProgress";
export { useControlsAutoHide } from "./presentation/hooks/useControlsAutoHide";

// Components
export { VideoPlayer } from "./presentation/components/VideoPlayer";
export { VideoProgressBar } from "./presentation/components/VideoProgressBar";
export { VideoPlayerOverlay } from "./presentation/components/VideoPlayerOverlay";
export { FullScreenVideoPlayer } from "./presentation/components/FullScreenVideoPlayer";
