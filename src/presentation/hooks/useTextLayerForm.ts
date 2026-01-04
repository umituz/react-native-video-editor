/**
 * useTextLayerForm Hook
 * Manages form state for text layer editor
 */

import { useState, useCallback } from "react";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import type { TextLayer } from "../../domain/entities";

export interface TextLayerFormState {
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: "normal" | "bold" | "300" | "700";
  color: string;
  textAlign: "left" | "center" | "right";
}

export interface UseTextLayerFormReturn {
  formState: TextLayerFormState;
  setText: (text: string) => void;
  setFontSize: (size: number) => void;
  setFontFamily: (family: string) => void;
  setFontWeight: (weight: "normal" | "bold" | "300" | "700") => void;
  setColor: (color: string) => void;
  setTextAlign: (align: "left" | "center" | "right") => void;
  buildLayerData: () => Partial<TextLayer>;
  isValid: boolean;
}

/**
 * Hook for managing text layer form state
 */
export function useTextLayerForm(
  initialLayer?: TextLayer,
): UseTextLayerFormReturn {
  const tokens = useAppDesignTokens();

  const [formState, setFormState] = useState<TextLayerFormState>({
    text: initialLayer?.content || "",
    fontSize: initialLayer?.fontSize || 48,
    fontFamily: initialLayer?.fontFamily || "System",
    fontWeight:
      (initialLayer?.fontWeight as "normal" | "bold" | "300" | "700") || "bold",
    color: initialLayer?.color || tokens.colors.textInverse,
    textAlign: initialLayer?.textAlign || "center",
  });

  const setText = useCallback((text: string) => {
    setFormState((prev) => ({ ...prev, text }));
  }, []);

  const setFontSize = useCallback((size: number) => {
    setFormState((prev) => ({ ...prev, fontSize: size }));
  }, []);

  const setFontFamily = useCallback((family: string) => {
    setFormState((prev) => ({ ...prev, fontFamily: family }));
  }, []);

  const setFontWeight = useCallback(
    (weight: "normal" | "bold" | "300" | "700") => {
      setFormState((prev) => ({ ...prev, fontWeight: weight }));
    },
    [],
  );

  const setColor = useCallback((color: string) => {
    setFormState((prev) => ({ ...prev, color }));
  }, []);

  const setTextAlign = useCallback((align: "left" | "center" | "right") => {
    setFormState((prev) => ({ ...prev, textAlign: align }));
  }, []);

  const buildLayerData = useCallback((): Partial<TextLayer> => {
    return {
      content: formState.text,
      fontSize: formState.fontSize,
      fontFamily: formState.fontFamily,
      fontWeight: formState.fontWeight,
      color: formState.color,
      textAlign: formState.textAlign,
    };
  }, [formState]);

  const isValid = formState.text.trim().length > 0;

  return {
    formState,
    setText,
    setFontSize,
    setFontFamily,
    setFontWeight,
    setColor,
    setTextAlign,
    buildLayerData,
    isValid,
  };
}
