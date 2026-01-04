/**
 * useAudioLayerForm Hook
 * Manages form state for audio layer editor
 */

import { useState, useCallback } from "react";
import type { Audio } from "../../domain/entities";

export interface AudioLayerFormState {
  audioUri: string;
  volume: number;
  fadeIn: number;
  fadeOut: number;
}

export interface UseAudioLayerFormReturn {
  formState: AudioLayerFormState;
  setAudioUri: (uri: string) => void;
  setVolume: (volume: number) => void;
  setFadeIn: (fadeIn: number) => void;
  setFadeOut: (fadeOut: number) => void;
  buildAudioData: () => Audio;
  isValid: boolean;
}

/**
 * Hook for managing audio layer form state
 */
export function useAudioLayerForm(
  initialAudio?: Audio,
): UseAudioLayerFormReturn {
  const [formState, setFormState] = useState<AudioLayerFormState>({
    audioUri: initialAudio?.uri || "",
    volume: initialAudio?.volume ?? 0.7,
    fadeIn: initialAudio?.fadeIn ?? 1000,
    fadeOut: initialAudio?.fadeOut ?? 1000,
  });

  const setAudioUri = useCallback((uri: string) => {
    setFormState((prev) => ({ ...prev, audioUri: uri }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setFormState((prev) => ({ ...prev, volume }));
  }, []);

  const setFadeIn = useCallback((fadeIn: number) => {
    setFormState((prev) => ({ ...prev, fadeIn }));
  }, []);

  const setFadeOut = useCallback((fadeOut: number) => {
    setFormState((prev) => ({ ...prev, fadeOut }));
  }, []);

  const buildAudioData = useCallback((): Audio => {
    return {
      uri: formState.audioUri,
      volume: formState.volume,
      startTime: 0,
      fadeIn: formState.fadeIn,
      fadeOut: formState.fadeOut,
    };
  }, [formState]);

  const isValid = formState.audioUri.length > 0;

  return {
    formState,
    setAudioUri,
    setVolume,
    setFadeIn,
    setFadeOut,
    buildAudioData,
    isValid,
  };
}
