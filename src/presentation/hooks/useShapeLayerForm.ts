/**
 * useShapeLayerForm Hook
 * Manages form state for shape layer editor
 */

import { useState, useCallback } from "react";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import type { ShapeLayer } from "../../../domain/entities";
import type { ShapeType } from "../constants/shape-layer.constants";

export interface ShapeLayerFormState {
  shape: ShapeType;
  fillColor: string;
  borderColor: string;
  borderWidth: number;
  opacity: number;
}

export interface UseShapeLayerFormReturn {
  formState: ShapeLayerFormState;
  setShape: (shape: ShapeType) => void;
  setFillColor: (color: string) => void;
  setBorderColor: (color: string) => void;
  setBorderWidth: (width: number) => void;
  setOpacity: (opacity: number) => void;
  buildLayerData: () => Partial<ShapeLayer>;
}

/**
 * Hook for managing shape layer form state
 */
export function useShapeLayerForm(
  initialLayer?: ShapeLayer,
): UseShapeLayerFormReturn {
  const tokens = useAppDesignTokens();

  const [formState, setFormState] = useState<ShapeLayerFormState>({
    shape: initialLayer?.shape || "rectangle",
    fillColor: initialLayer?.fillColor || "#3B82F6",
    borderColor: initialLayer?.borderColor || tokens.colors.textPrimary,
    borderWidth: initialLayer?.borderWidth || 0,
    opacity: initialLayer?.opacity || 1,
  });

  const setShape = useCallback((shape: ShapeType) => {
    setFormState((prev) => ({ ...prev, shape }));
  }, []);

  const setFillColor = useCallback((color: string) => {
    setFormState((prev) => ({ ...prev, fillColor: color }));
  }, []);

  const setBorderColor = useCallback((color: string) => {
    setFormState((prev) => ({ ...prev, borderColor: color }));
  }, []);

  const setBorderWidth = useCallback((width: number) => {
    setFormState((prev) => ({ ...prev, borderWidth: width }));
  }, []);

  const setOpacity = useCallback((opacity: number) => {
    setFormState((prev) => ({ ...prev, opacity }));
  }, []);

  const buildLayerData = useCallback((): Partial<ShapeLayer> => {
    return {
      shape: formState.shape,
      fillColor: formState.fillColor,
      borderColor: formState.borderColor,
      borderWidth: formState.borderWidth,
      opacity: formState.opacity,
    };
  }, [formState]);

  return {
    formState,
    setShape,
    setFillColor,
    setBorderColor,
    setBorderWidth,
    setOpacity,
    buildLayerData,
  };
}
