/**
 * useEditorPlayback Hook
 * Single Responsibility: Playback control for editor
 * Optimized for performance with stable animation loop
 */

import { useState, useEffect, useCallback, useRef } from "react";
import type { Scene } from "../../domain/entities/video-project.types";
import {
  calculateDelta,
  addDeltaTime,
  isTimeAtEnd,
} from "../../infrastructure/utils/time-calculations.utils";

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

  // Video playback animation loop - optimized with refs
  useEffect(() => {
    if (!currentScene) return;

    const animate = (timestamp: number) => {
      // Use refs for checks to avoid closure staleness
      if (!isPlayingRef.current || !currentSceneRef.current) {
        animationFrameRef.current = null;
        return;
      }

      if (lastTimestampRef.current === 0) {
        lastTimestampRef.current = timestamp;
      }

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
