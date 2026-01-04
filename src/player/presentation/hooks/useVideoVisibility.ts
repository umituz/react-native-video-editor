/**
 * useVideoVisibility Hook
 * Handles auto play/pause based on visibility
 */

import { useState, useCallback, useEffect } from "react";

import type { VideoVisibilityConfig } from "../../types";
import {
  safePlay,
  safePause,
} from "../../infrastructure/services/player-control.service";

/**
 * Optional navigation focus hook type
 */
type UseFocusEffectType = (callback: () => (() => void) | undefined) => void;

/**
 * Hook for managing video visibility-based playback
 * @param config - Visibility configuration
 * @param useFocusEffect - Optional navigation focus hook (from @react-navigation/native)
 */
export const useVideoVisibility = (
  config: VideoVisibilityConfig,
  useFocusEffect?: UseFocusEffectType,
): void => {
  const { isVisible, player, isPlayerValid, onPlayingChange } = config;
  const [isScreenFocused, setIsScreenFocused] = useState(true);

  // Handle screen focus if navigation hook provided
  useEffect(() => {
    if (!useFocusEffect) return;

    useFocusEffect(
      useCallback(() => {
        setIsScreenFocused(true);

        return () => {
          setIsScreenFocused(false);
          if (isPlayerValid) {
            safePause(player);
            onPlayingChange?.(false);
          }
        };
      }, [isPlayerValid, player, onPlayingChange]),
    );
  }, [useFocusEffect, isPlayerValid, player, onPlayingChange]);

  // Handle visibility changes
  useEffect(() => {
    if (!isPlayerValid) return;

    if (isVisible && isScreenFocused) {
      const success = safePlay(player);
      if (success) onPlayingChange?.(true);
    } else {
      const success = safePause(player);
      if (success) onPlayingChange?.(false);
    }
  }, [isVisible, isScreenFocused, isPlayerValid, player, onPlayingChange]);
};
