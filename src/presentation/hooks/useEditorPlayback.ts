/**
 * useEditorPlayback Hook
 * Single Responsibility: Playback control for editor
 */

import { useState, useEffect, useCallback } from "react";
import type { Scene } from "@domains/video";

export interface UseEditorPlaybackParams {
  currentScene: Scene | undefined;
}

export interface UseEditorPlaybackReturn {
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

  // Video playback animation loop
  useEffect(() => {
    if (!currentScene) return;
    let animationFrameId: number;
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (!isPlaying || !currentScene) return;

      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      setCurrentTime((prevTime) => {
        const newTime = prevTime + deltaTime;
        const sceneDuration = currentScene.duration;

        if (newTime >= sceneDuration) {
          setIsPlaying(false);
          return sceneDuration;
        }

        return newTime;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      lastTimestamp = 0;
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying, currentScene?.duration]);

  const playPause = useCallback(() => {
    if (!currentScene) return;

    if (currentTime >= currentScene.duration) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  }, [currentScene, currentTime, isPlaying]);

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
