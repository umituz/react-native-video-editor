/**
 * Player Control Service
 * Safe operations for video player control
 */

import type { VideoPlayer } from "expo-video";

declare const __DEV__: boolean;

/**
 * Safely play video with error handling
 */
export const safePlay = (player: VideoPlayer | null): boolean => {
  console.log("[safePlay] called, player:", !!player);
  if (!player) return false;

  try {
    console.log("[safePlay] calling player.play()");
    player.play();
    console.log("[safePlay] player.play() called successfully");
    return true;
  } catch (error) {
    console.log("[safePlay] Play error:", error);
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
      // eslint-disable-next-line no-console
      console.log("[VideoPlayer] Pause error ignored:", error);
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
      // eslint-disable-next-line no-console
      console.log("[VideoPlayer] Configure error ignored:", error);
    }
  }
};
