/**
 * TextLayerEditor Component
 * Main component for editing text layers
 */

import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useLocalization } from "@umituz/react-native-localization";
import type { TextLayer } from "../../../domain/entities";
import { useTextLayerForm } from "../../hooks/useTextLayerForm";
import {
  FONT_FAMILIES,
  FONT_WEIGHTS,
} from "../../constants/text-layer.constants";
import {
  TextInputSection,
  FontSizeSelector,
  OptionSelector,
  TextAlignSelector,
  ColorPicker,
  TextPreview,
  EditorActions,
} from "./text-layer";

interface TextLayerEditorProps {
  layer?: TextLayer;
  onSave: (layerData: Partial<TextLayer>) => void;
  onCancel: () => void;
}

export const TextLayerEditor: React.FC<TextLayerEditorProps> = ({
  layer,
  onSave,
  onCancel,
}) => {
  const { t } = useLocalization();
  const {
    formState,
    setText,
    setFontSize,
    setFontFamily,
    setFontWeight,
    setColor,
    setTextAlign,
    buildLayerData,
    isValid,
  } = useTextLayerForm(layer);

  const handleSave = () => {
    if (!isValid) return;
    onSave(buildLayerData());
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInputSection text={formState.text} onChangeText={setText} />

        <FontSizeSelector
          fontSize={formState.fontSize}
          onFontSizeChange={setFontSize}
        />

        <OptionSelector
          title={t("editor.properties.font_family")}
          options={FONT_FAMILIES.map((f) => ({ label: f, value: f }))}
          selectedValue={formState.fontFamily}
          onValueChange={setFontFamily}
        />

        <OptionSelector
          title="Font Weight"
          options={FONT_WEIGHTS}
          selectedValue={formState.fontWeight}
          onValueChange={(value) =>
            setFontWeight(value as "normal" | "bold" | "300" | "700")
          }
        />

        <TextAlignSelector
          textAlign={formState.textAlign}
          onTextAlignChange={setTextAlign}
        />

        <ColorPicker selectedColor={formState.color} onColorChange={setColor} />

        <TextPreview formState={formState} />
      </ScrollView>

      <EditorActions
        onCancel={onCancel}
        onSave={handleSave}
        saveLabel={layer ? "Update" : "Add Text"}
        isValid={isValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: "80%",
  },
});
