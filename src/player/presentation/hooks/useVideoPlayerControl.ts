/**
 * useVideoPlayerControl Hook
 * Main hook for video player control with safe operations
 */

import { useState, useCallback, useMemo } from "react";
import { useVideoPlayer as useExpoVideoPlayer } from "expo-video";

import type {
  VideoPlayerConfig,
  VideoPlayerState,
  VideoPlayerControls,
  UseVideoPlayerControlResult,
} from "../../types";
import {
  safePlay,
  safePause,
  safeToggle,
  isPlayerReady,
  configurePlayer,
} from "../../infrastructure/services/player-control.service";

declare const __DEV__: boolean;

/**
 * Hook for managing video player with safe operations
 */
export const useVideoPlayerControl = (
  config: VideoPlayerConfig,
): UseVideoPlayerControlResult => {
  const { source, loop = true, muted = false, autoPlay = false } = config;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const player = useExpoVideoPlayer(source || "", (p) => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[useVideoPlayerControl] Player callback, source:", source, "player:", !!p);
    }
    if (source && p) {
      configurePlayer(p, { loop, muted, autoPlay });
      setIsLoading(false);
      if (autoPlay) {
        setIsPlaying(true);
      }
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useVideoPlayerControl] Player configured:", {
          status: p.status,
          playing: p.playing,
          muted: p.muted,
          loop: p.loop,
        });
      }
    }
  });

  const isPlayerValid = useMemo(
    () => isPlayerReady(player, source),
    [player, source],
  );

  const play = useCallback(() => {
    if (!isPlayerValid) return;
    const success = safePlay(player);
    if (success) setIsPlaying(true);
  }, [player, isPlayerValid]);

  const pause = useCallback(() => {
    if (!isPlayerValid) return;
    const success = safePause(player);
    if (success) setIsPlaying(false);
  }, [player, isPlayerValid]);

  const toggle = useCallback(() => {
    if (!isPlayerValid) return;
    const success = safeToggle(player, isPlaying);
    if (success) setIsPlaying(!isPlaying);
  }, [player, isPlayerValid, isPlaying]);

  const state: VideoPlayerState = useMemo(
    () => ({
      isPlaying,
      isPlayerValid,
      isLoading: isLoading && Boolean(source),
    }),
    [isPlaying, isPlayerValid, isLoading, source],
  );

  const controls: VideoPlayerControls = useMemo(
    () => ({ play, pause, toggle }),
    [play, pause, toggle],
  );

  return { player, state, controls };
};
