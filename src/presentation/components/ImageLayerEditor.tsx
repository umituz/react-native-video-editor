/**
 * ImageLayerEditor Component
 * Main component for editing image layers
 */

import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import type { ImageLayer } from "../../domain/entities";
import { useImageLayerForm } from "../hooks/useImageLayerForm";
import {
  ImagePreview,
  ImageSelectionButtons,
  OpacitySelector,
} from "./image-layer";
import { EditorActions } from "./text-layer/EditorActions";

interface ImagePickerResult {
  canceled: boolean;
  assets?: Array<{ uri: string }>;
}

interface ImageLayerEditorProps {
  readonly layer?: ImageLayer;
  readonly onSave: (layerData: Partial<ImageLayer>) => void;
  readonly onCancel: () => void;
  readonly onPickFromLibrary?: () => Promise<ImagePickerResult>;
  readonly onTakePhoto?: () => Promise<ImagePickerResult>;
}

export const ImageLayerEditor: React.FC<ImageLayerEditorProps> = ({
  layer,
  onSave,
  onCancel,
  onPickFromLibrary,
  onTakePhoto,
}) => {
  const { formState, setImageUri, setOpacity, buildLayerData, isValid } =
    useImageLayerForm(layer);

  const handlePickImage = useCallback(async () => {
    if (!onPickFromLibrary) {
      Alert.alert("Not Available", "Image picker not configured.");
      return;
    }
    const result = await onPickFromLibrary();

    if (!result.canceled && result.assets?.[0]) {
      setImageUri(result.assets[0].uri);
    }
  }, [onPickFromLibrary, setImageUri]);

  const handleTakePhoto = useCallback(async () => {
    if (!onTakePhoto) {
      Alert.alert("Not Available", "Camera not configured.");
      return;
    }
    const result = await onTakePhoto();

    if (!result.canceled && result.assets?.[0]) {
      setImageUri(result.assets[0].uri);
    }
  }, [onTakePhoto, setImageUri]);

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
        <View style={styles.previewContainer}>
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
  previewContainer: {
    marginBottom: 24,
  },
});
