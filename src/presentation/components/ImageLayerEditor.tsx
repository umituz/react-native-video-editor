/**
 * ImageLayerEditor Component
 * Main component for editing image layers
 */

import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { useImagePicker } from "@/domains/media";
import type { ImageLayer } from "../../../domain/entities";
import { useImageLayerForm } from "../../hooks/useImageLayerForm";
import { IMAGE_PICKER_OPTIONS } from "../../constants/image-layer.constants";
import {
  ImagePreview,
  ImageSelectionButtons,
  OpacitySelector,
} from "./image-layer";
import { EditorActions } from "./text-layer/EditorActions";

interface ImageLayerEditorProps {
  layer?: ImageLayer;
  onSave: (layerData: Partial<ImageLayer>) => void;
  onCancel: () => void;
}

export const ImageLayerEditor: React.FC<ImageLayerEditorProps> = ({
  layer,
  onSave,
  onCancel,
}) => {
  const { pickFromLibrary, pickFromCamera } = useImagePicker();
  const { formState, setImageUri, setOpacity, buildLayerData, isValid } =
    useImageLayerForm(layer);

  const handlePickImage = useCallback(async () => {
    const result = await pickFromLibrary(IMAGE_PICKER_OPTIONS);

    if (!result.canceled && result.assets?.[0]) {
      setImageUri(result.assets[0].uri);
    }
  }, [pickFromLibrary, setImageUri]);

  const handleTakePhoto = useCallback(async () => {
    const result = await pickFromCamera(IMAGE_PICKER_OPTIONS);

    if (!result.canceled && result.assets?.[0]) {
      setImageUri(result.assets[0].uri);
    }
  }, [pickFromCamera, setImageUri]);

  const handleSave = useCallback(() => {
    if (!isValid) {
      Alert.alert("No Image", "Please select an image first.");
      return;
    }
    onSave(buildLayerData());
  }, [isValid, buildLayerData, onSave]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 24 }}>
          <ImagePreview
            imageUri={formState.imageUri}
            opacity={formState.opacity}
          />
        </View>

        <ImageSelectionButtons
          onPickFromGallery={handlePickImage}
          onTakePhoto={handleTakePhoto}
        />

        {formState.imageUri && (
          <OpacitySelector
            opacity={formState.opacity}
            onOpacityChange={setOpacity}
          />
        )}
      </ScrollView>

      <EditorActions
        onCancel={onCancel}
        onSave={handleSave}
        saveLabel={layer ? "Update Image" : "Add Image"}
        isValid={isValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});
