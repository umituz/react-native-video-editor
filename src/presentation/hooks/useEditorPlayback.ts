/**
 * useEditorPlayback Hook
 * Single Responsibility: Playback control for editor
 * PERFORMANCE: Optimized with frame throttling (30fps target) and stable refs
 */

import { useState, useEffect, useCallback, useRef } from "react";
import type { Scene } from "../../domain/entities/video-project.types";
import {
  calculateDelta,
  addDeltaTime,
  isTimeAtEnd,
} from "../../infrastructure/utils/time-calculations.utils";

// PERFORMANCE: Target 30fps instead of 60fps to reduce CPU load
// 60fps = 16.67ms, 30fps = 33.33ms between frames
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

interface UseEditorPlaybackParams {
  currentScene: Scene | undefined;
}

interface UseEditorPlaybackReturn {
  isPlaying: boolean;
  currentTime: number;
  playPause: () => void;
  reset: () => void;
  setCurrentTime: (time: number) => void;
}

export function useEditorPlayback({
  currentScene,
}: UseEditorPlaybackParams): UseEditorPlaybackReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Use refs to avoid re-creating animation loop on every render
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0); // Track frame time for throttling
  const isPlayingRef = useRef(isPlaying);
  const currentSceneRef = useRef(currentScene);
  const durationRef = useRef(0);

  // Keep refs in sync
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    currentSceneRef.current = currentScene;
    if (currentScene) {
      durationRef.current = currentScene.duration;
    }
  }, [currentScene]);

  // Video playback animation loop - optimized with refs and frame throttling
  useEffect(() => {
    if (!currentScene) return;

    const animate = (timestamp: number) => {
      // Use refs for checks to avoid closure staleness
      if (!isPlayingRef.current || !currentSceneRef.current) {
        animationFrameRef.current = null;
        return;
      }

      // PERFORMANCE: Frame throttling - skip frames to maintain target FPS
      if (lastFrameTimeRef.current > 0) {
        const elapsed = timestamp - lastFrameTimeRef.current;
        if (elapsed < FRAME_INTERVAL) {
          animationFrameRef.current = requestAnimationFrame(animate);
          return;
        }
      }

      if (lastTimestampRef.current === 0) {
        lastTimestampRef.current = timestamp;
      }
      lastFrameTimeRef.current = timestamp;

      const deltaTime = calculateDelta(timestamp, lastTimestampRef.current);
      lastTimestampRef.current = timestamp;

      setCurrentTime((prevTime) => {
        const newTime = addDeltaTime(prevTime, deltaTime);
        const sceneDuration = durationRef.current;

        if (isTimeAtEnd(newTime, sceneDuration)) {
          // Defer state update to avoid in-render setState
          Promise.resolve().then(() => {
            setIsPlaying(false);
          });
          return sceneDuration;
        }

        return newTime;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      lastTimestampRef.current = 0;
      lastFrameTimeRef.current = 0;
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isPlaying, currentScene]); // Only re-create loop when these change

  const playPause = useCallback(() => {
    if (!currentScene) return;

    setCurrentTime((prevTime) => {
      // Reset to 0 if at end
      if (prevTime >= currentScene.duration) {
        return 0;
      }
      return prevTime;
    });

    setIsPlaying((prev) => !prev);
  }, [currentScene]);

  const reset = useCallback(() => {
    setCurrentTime(0);
    setIsPlaying(false);
  }, []);

  return {
    isPlaying,
    currentTime,
    playPause,
    reset,
    setCurrentTime,
  };
}
