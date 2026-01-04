/**
 * useImageLayerForm Hook
 * Manages form state for image layer editor
 */

import { useState, useCallback } from "react";
import type { ImageLayer } from "../../domain/entities";

export interface ImageLayerFormState {
  imageUri: string;
  opacity: number;
}

export interface UseImageLayerFormReturn {
  formState: ImageLayerFormState;
  setImageUri: (uri: string) => void;
  setOpacity: (opacity: number) => void;
  buildLayerData: () => Partial<ImageLayer>;
  isValid: boolean;
}

/**
 * Hook for managing image layer form state
 */
export function useImageLayerForm(
  initialLayer?: ImageLayer,
): UseImageLayerFormReturn {
  const [formState, setFormState] = useState<ImageLayerFormState>({
    imageUri: initialLayer?.uri || "",
    opacity: initialLayer?.opacity || 1,
  });

  const setImageUri = useCallback((uri: string) => {
    setFormState((prev) => ({ ...prev, imageUri: uri }));
  }, []);

  const setOpacity = useCallback((opacity: number) => {
    setFormState((prev) => ({ ...prev, opacity }));
  }, []);

  const buildLayerData = useCallback((): Partial<ImageLayer> => {
    return {
      uri: formState.imageUri,
      opacity: formState.opacity,
    };
  }, [formState]);

  const isValid = formState.imageUri.length > 0;

  return {
    formState,
    setImageUri,
    setOpacity,
    buildLayerData,
    isValid,
  };
}
