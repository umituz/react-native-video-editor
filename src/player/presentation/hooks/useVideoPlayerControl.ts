/**
 * useVideoPlayerControl Hook
 * Main hook for video player control with safe operations
 */

import { useState, useCallback, useMemo } from "react";
// expo-video is optional — module-level lazy require with null stub
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let useExpoVideoPlayer: (...args: any[]) => any = () => null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  useExpoVideoPlayer = require("expo-video").useVideoPlayer;
} catch {
  // expo-video not installed in consuming app
}

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
  safeSeekTo,
  safeMute,
  safeReplay,
} from "../../infrastructure/services/player-control.service";
import { useVideoPlaybackProgress } from "./useVideoPlaybackProgress";

/**
 * Hook for managing video player with safe operations
 */
export const useVideoPlayerControl = (
  config: VideoPlayerConfig,
): UseVideoPlayerControlResult => {
  const { source, loop = true, muted = false, autoPlay = false, playbackRate: initialRate = 1 } = config;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackRate, setPlaybackRateState] = useState(initialRate);
  const [isMuted, setIsMuted] = useState(muted);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const player = useExpoVideoPlayer(source || "", (p: any) => {
    if (source && p) {
      configurePlayer(p, { loop, muted, autoPlay });
      setIsLoading(false);
      if (autoPlay) {
        setIsPlaying(true);
      }
    }
  });

  const isPlayerValid = useMemo(
    () => isPlayerReady(player, source),
    [player, source],
  );

  // Sync isPlaying with actual player state (handles video end, system pause, etc.)
  const handlePlayingStateChanged = useCallback((actuallyPlaying: boolean) => {
    setIsPlaying(actuallyPlaying);
  }, []);

  // Track playback progress + sync playing state
  const { currentTime, duration, progress } = useVideoPlaybackProgress(
    player,
    isPlayerValid,
    isPlaying,
    handlePlayingStateChanged,
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

  const setPlaybackRate = useCallback((rate: number) => {
    if (!isPlayerValid || !player) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (player as any).playbackRate = rate;
    setPlaybackRateState(rate);
  }, [player, isPlayerValid]);

  const toggleMute = useCallback(() => {
    if (!isPlayerValid) return;
    const newMuted = !isMuted;
    const success = safeMute(player, newMuted);
    if (success) setIsMuted(newMuted);
  }, [player, isPlayerValid, isMuted]);

  const setMutedFn = useCallback((value: boolean) => {
    if (!isPlayerValid) return;
    const success = safeMute(player, value);
    if (success) setIsMuted(value);
  }, [player, isPlayerValid]);

  const seekTo = useCallback((seconds: number) => {
    if (!isPlayerValid) return;
    safeSeekTo(player, seconds);
  }, [player, isPlayerValid]);

  const replay = useCallback(() => {
    if (!isPlayerValid) return;
    const success = safeReplay(player);
    if (success) setIsPlaying(true);
  }, [player, isPlayerValid]);

  const state: VideoPlayerState = useMemo(
    () => ({
      isPlaying,
      isPlayerValid,
      isLoading: isLoading && Boolean(source),
      playbackRate,
      isMuted,
      currentTime,
      duration,
      progress,
    }),
    [isPlaying, isPlayerValid, isLoading, source, playbackRate, isMuted, currentTime, duration, progress],
  );

  const controls: VideoPlayerControls = useMemo(
    () => ({ play, pause, toggle, setPlaybackRate, toggleMute, setMuted: setMutedFn, seekTo, replay }),
    [play, pause, toggle, setPlaybackRate, toggleMute, setMutedFn, seekTo, replay],
  );

  return { player, state, controls };
};
