/**
 * useVideoPlaybackProgress Hook
 * Tracks currentTime, duration, progress, and actual playing state by polling the expo-video player
 */

import { useState, useEffect, useRef, useCallback } from "react";

import type { PlaybackProgressState } from "../../types";

const POLL_INTERVAL_MS = 250;

/**
 * Polls the player for currentTime/duration and returns progress (0-1)
 * Also returns the player's actual playing state to detect out-of-sync conditions
 */
export const useVideoPlaybackProgress = (
  player: any,
  isPlayerValid: boolean,
  isPlaying: boolean,
  onPlayingStateChanged?: (actuallyPlaying: boolean) => void,
): PlaybackProgressState => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const onPlayingStateChangedRef = useRef(onPlayingStateChanged);
  onPlayingStateChangedRef.current = onPlayingStateChanged;

  const pollPlayer = useCallback(() => {
    if (!player || !isPlayerValid) return;

    try {
      const ct = typeof player.currentTime === "number" ? Math.max(0, player.currentTime) : 0;
      const dur = typeof player.duration === "number" && isFinite(player.duration) ? player.duration : 0;

      setCurrentTime(ct);
      if (dur > 0) setDuration(dur);

      // Sync actual playing state — detects when video ends or system pauses
      const actuallyPlaying = Boolean(player.playing);
      if (actuallyPlaying !== isPlaying) {
        onPlayingStateChangedRef.current?.(actuallyPlaying);
      }
    } catch {
      // Player may be in an invalid state during transitions
    }
  }, [player, isPlayerValid, isPlaying]);

  useEffect(() => {
    // Poll once immediately to get initial state
    pollPlayer();

    if (isPlaying && isPlayerValid) {
      const id = setInterval(pollPlayer, POLL_INTERVAL_MS);
      return () => clearInterval(id);
    }
  }, [isPlaying, isPlayerValid, pollPlayer]);

  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;

  return { currentTime, duration, progress };
};
