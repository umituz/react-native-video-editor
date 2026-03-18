/**
 * useImageLayerForm Hook
 * Manages form state for image layer editor
 */

import type { ImageLayer } from "../../domain/entities/video-project.types";
import { useLayerForm } from "./generic/use-layer-form.hook";

interface ImageLayerFormState {
  imageUri: string;
  opacity: number;
}

interface UseImageLayerFormReturn {
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
  const form = useLayerForm<ImageLayerFormState>({
    initialValues: {
      imageUri: initialLayer?.uri || "",
      opacity: initialLayer?.opacity || 1,
    },
    validators: {
      imageUri: (value) => {
        if (!value || value.trim().length === 0) {
          return "Image URI is required";
        }
        return null;
      },
    },
    buildData: (formState) => ({
      uri: formState.imageUri,
      opacity: formState.opacity,
    }),
  });

  const setImageUri = (uri: string) => form.updateField("imageUri", uri);
  const setOpacity = (opacity: number) => form.updateField("opacity", opacity);

  return {
    formState: form.formState,
    setImageUri,
    setOpacity,
    buildLayerData: form.buildLayerData,
    isValid: form.isValid,
  };
}
