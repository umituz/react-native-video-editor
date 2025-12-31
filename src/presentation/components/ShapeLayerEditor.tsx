/**
 * ShapeLayerEditor Component
 * Main component for editing shape layers
 */

import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { ShapeLayer } from "../../../domain/entities";
import { useShapeLayerForm } from "../../hooks/useShapeLayerForm";
import {
  BORDER_WIDTHS,
  OPACITY_OPTIONS,
} from "../../constants/shape-layer.constants";
import {
  ShapeTypeSelector,
  ColorPickerHorizontal,
  ValueSelector,
  ShapePreview,
} from "./shape-layer";
import { EditorActions } from "./text-layer/EditorActions";

interface ShapeLayerEditorProps {
  layer?: ShapeLayer;
  onSave: (layerData: Partial<ShapeLayer>) => void;
  onCancel: () => void;
}

export const ShapeLayerEditor: React.FC<ShapeLayerEditorProps> = ({
  layer,
  onSave,
  onCancel,
}) => {
  const tokens = useAppDesignTokens();
  const {
    formState,
    setShape,
    setFillColor,
    setBorderColor,
    setBorderWidth,
    setOpacity,
    buildLayerData,
  } = useShapeLayerForm(layer);

  const handleSave = () => {
    onSave(buildLayerData());
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ShapeTypeSelector
          selectedShape={formState.shape}
          onShapeChange={setShape}
        />

        <ColorPickerHorizontal
          title="Fill Color"
          selectedColor={formState.fillColor}
          onColorChange={setFillColor}
        />

        <ValueSelector
          title="Border Width"
          value={formState.borderWidth}
          options={BORDER_WIDTHS}
          formatValue={(val) => `${val}px`}
          onValueChange={setBorderWidth}
        />

        {formState.borderWidth > 0 && (
          <ColorPickerHorizontal
            title="Border Color"
            selectedColor={formState.borderColor}
            onColorChange={setBorderColor}
          />
        )}

        <ValueSelector
          title="Opacity"
          value={formState.opacity}
          options={OPACITY_OPTIONS}
          formatValue={(val) => `${Math.round(val * 100)}%`}
          onValueChange={setOpacity}
        />

        <ShapePreview formState={formState} />
      </ScrollView>

      <EditorActions
        onCancel={onCancel}
        onSave={handleSave}
        saveLabel="Add Shape"
        isValid={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});
