/**
 * useControlsAutoHide Hook
 * Manages visibility of video player overlay controls with auto-hide timer
 */

import { useState, useEffect, useRef, useCallback } from "react";

import type { ControlsAutoHideConfig, ControlsAutoHideResult } from "../../types";

const DEFAULT_AUTO_HIDE_DELAY = 3000;

export const useControlsAutoHide = (
  config: ControlsAutoHideConfig,
): ControlsAutoHideResult => {
  const { autoHideDelay = DEFAULT_AUTO_HIDE_DELAY, isPlaying } = config;
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        setVisible(false);
      }, autoHideDelay);
    }
  }, [clearTimer, isPlaying, autoHideDelay]);

  const show = useCallback(() => {
    setVisible(true);
    startTimer();
  }, [startTimer]);

  const hide = useCallback(() => {
    clearTimer();
    setVisible(false);
  }, [clearTimer]);

  const toggle = useCallback(() => {
    if (visible) {
      hide();
    } else {
      show();
    }
  }, [visible, show, hide]);

  // Auto-hide when playing starts, show when paused
  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      clearTimer();
      setVisible(true);
    }

    return clearTimer;
  }, [isPlaying, startTimer, clearTimer]);

  return { visible, show, hide, toggle };
};
