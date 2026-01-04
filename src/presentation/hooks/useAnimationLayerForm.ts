/**
 * useAnimationLayerForm Hook
 * Manages form state for animation layer editor
 */

import { useState, useCallback } from "react";
import type { Animation, AnimationType } from "../../domain/entities";
import type { Easing } from "../../infrastructure/constants/animation-layer.constants";

export interface AnimationLayerFormState {
  animationType: AnimationType;
  duration: number;
  delay: number;
  easing: Easing;
}

export interface UseAnimationLayerFormReturn {
  formState: AnimationLayerFormState;
  setAnimationType: (type: AnimationType) => void;
  setDuration: (duration: number) => void;
  setDelay: (delay: number) => void;
  setEasing: (easing: Easing) => void;
  buildAnimationData: () => Animation;
}

/**
 * Hook for managing animation layer form state
 */
export function useAnimationLayerForm(
  initialAnimation?: Animation,
): UseAnimationLayerFormReturn {
  const [formState, setFormState] = useState<AnimationLayerFormState>({
    animationType: initialAnimation?.type || "fade",
    duration: initialAnimation?.duration || 500,
    delay: initialAnimation?.delay || 0,
    easing: initialAnimation?.easing || "ease-in-out",
  });

  const setAnimationType = useCallback((type: AnimationType) => {
    setFormState((prev) => ({ ...prev, animationType: type }));
  }, []);

  const setDuration = useCallback((duration: number) => {
    setFormState((prev) => ({ ...prev, duration }));
  }, []);

  const setDelay = useCallback((delay: number) => {
    setFormState((prev) => ({ ...prev, delay }));
  }, []);

  const setEasing = useCallback((easing: Easing) => {
    setFormState((prev) => ({ ...prev, easing }));
  }, []);

  const buildAnimationData = useCallback((): Animation => {
    return {
      type: formState.animationType,
      duration: formState.duration,
      delay: formState.delay,
      easing: formState.easing,
    };
  }, [formState]);

  return {
    formState,
    setAnimationType,
    setDuration,
    setDelay,
    setEasing,
    buildAnimationData,
  };
}
