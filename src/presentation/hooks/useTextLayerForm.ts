/**
 * useTextLayerForm Hook
 * Manages form state for text layer editor
 */

import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { TextLayer } from "../../domain/entities/video-project.types";
import { useLayerForm, type UseLayerFormConfig } from "./generic/use-layer-form.hook";

export interface TextLayerFormState {
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: "normal" | "bold" | "300" | "700";
  color: string;
  textAlign: "left" | "center" | "right";
  [key: string]: unknown;
}

interface UseTextLayerFormReturn {
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

  const config: UseLayerFormConfig<TextLayerFormState> = {
    initialValues: {
      text: initialLayer?.content || "",
      fontSize: initialLayer?.fontSize || 48,
      fontFamily: initialLayer?.fontFamily || "System",
      fontWeight:
        (initialLayer?.fontWeight as "normal" | "bold" | "300" | "700") || "bold",
      color: initialLayer?.color || tokens.colors.textInverse,
      textAlign: initialLayer?.textAlign || "center",
    },
    validators: {
      text: (value: unknown) => {
        if (!value || (typeof value === "string" && value.trim().length === 0)) {
          return "Text content is required";
        }
        if (typeof value !== "string") {
          return "Text content must be a string";
        }
        return null;
      },
    },
    buildData: (formState) => ({
      content: formState.text,
      fontSize: formState.fontSize,
      fontFamily: formState.fontFamily,
      fontWeight: formState.fontWeight,
      color: formState.color,
      textAlign: formState.textAlign,
    } as Partial<TextLayer>),
  };

  const form = useLayerForm<TextLayerFormState, Partial<TextLayer>>(config);

  const setText = (text: string) => form.updateField("text", text);
  const setFontSize = (size: number) => form.updateField("fontSize", size);
  const setFontFamily = (family: string) => form.updateField("fontFamily", family);
  const setFontWeight = (weight: "normal" | "bold" | "300" | "700") =>
    form.updateField("fontWeight", weight);
  const setColor = (color: string) => form.updateField("color", color);
  const setTextAlign = (align: "left" | "center" | "right") =>
    form.updateField("textAlign", align);

  return {
    formState: form.formState,
    setText,
    setFontSize,
    setFontFamily,
    setFontWeight,
    setColor,
    setTextAlign,
    buildLayerData: form.buildLayerData,
    isValid: form.isValid,
  };
}
