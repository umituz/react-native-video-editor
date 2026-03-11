/**
 * Player Control Service
 * Safe operations for video player control
 */

import type { VideoPlayer } from "expo-video";

/**
 * Safely play video with error handling
 */
export const safePlay = (player: VideoPlayer | null): boolean => {
  if (!player) return false;

  try {
    player.play();
    return true;
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[VideoPlayer] Play error:", error);
    }
    return false;
  }
};

/**
 * Safely pause video with error handling
 */
export const safePause = (player: VideoPlayer | null): boolean => {
  if (!player) return false;

  try {
    player.pause();
    return true;
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[VideoPlayer] Pause error:", error);
    }
    return false;
  }
};

/**
 * Safely toggle play/pause state
 */
export const safeToggle = (
  player: VideoPlayer | null,
  isPlaying: boolean,
): boolean => {
  if (!player) return false;

  return isPlaying ? safePause(player) : safePlay(player);
};

/**
 * Check if player has valid native object
 */
export const isPlayerReady = (
  player: VideoPlayer | null,
  source: string | null,
): boolean => {
  return Boolean(player && source && source.length > 0);
};

/**
 * Configure player with initial settings
 */
export const configurePlayer = (
  player: VideoPlayer,
  options: {
    loop?: boolean;
    muted?: boolean;
    autoPlay?: boolean;
  },
): void => {
  try {
    if (options.loop !== undefined) {
      player.loop = options.loop;
    }
    if (options.muted !== undefined) {
      player.muted = options.muted;
    }
    if (options.autoPlay) {
      player.play();
    }
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[VideoPlayer] Configure error:", error);
    }
  }
};

/**
 * Safely seek to a specific time position (in seconds)
 */
export const safeSeekTo = (player: VideoPlayer | null, seconds: number): boolean => {
  if (!player) return false;

  try {
    player.currentTime = Math.max(0, seconds);
    return true;
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[VideoPlayer] SeekTo error:", error);
    }
    return false;
  }
};

/**
 * Safely set muted state
 */
export const safeMute = (player: VideoPlayer | null, muted: boolean): boolean => {
  if (!player) return false;

  try {
    player.muted = muted;
    return true;
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[VideoPlayer] Mute error:", error);
    }
    return false;
  }
};

/**
 * Safely replay video from beginning
 */
export const safeReplay = (player: VideoPlayer | null): boolean => {
  if (!player) return false;

  try {
    player.currentTime = 0;
    player.play();
    return true;
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[VideoPlayer] Replay error:", error);
    }
    return false;
  }
};
