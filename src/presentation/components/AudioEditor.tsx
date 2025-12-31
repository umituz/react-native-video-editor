/**
 * AudioEditor Component
 * Main component for editing audio layers
 */

import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { Audio } from "../../../domain/entities";
import { useAudioLayerForm } from "../../hooks/useAudioLayerForm";
import { AUDIO_FILE_TYPES } from "../../constants/audio-layer.constants";
import {
  AudioFileSelector,
  VolumeSelector,
  FadeEffectsSelector,
  InfoBanner,
  AudioEditorActions,
} from "./audio-layer";

interface AudioEditorProps {
  audio?: Audio;
  onSave: (audioData: Audio) => void;
  onRemove?: () => void;
  onCancel: () => void;
}

export const AudioEditor: React.FC<AudioEditorProps> = ({
  audio,
  onSave,
  onRemove,
  onCancel,
}) => {
  const tokens = useAppDesignTokens();
  const {
    formState,
    setAudioUri,
    setVolume,
    setFadeIn,
    setFadeOut,
    buildAudioData,
    isValid,
  } = useAudioLayerForm(audio);

  const handlePickAudio = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: AUDIO_FILE_TYPES[0],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAudioUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick audio file");
    }
  }, [setAudioUri]);

  const handleSave = useCallback(() => {
    if (!isValid) {
      Alert.alert("Error", "Please select an audio file");
      return;
    }
    onSave(buildAudioData());
  }, [isValid, buildAudioData, onSave]);

  const handleRemoveAudio = useCallback(() => {
    Alert.alert(
      "Remove Audio",
      "Are you sure you want to remove the audio from this scene?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            onRemove?.();
          },
        },
      ],
    );
  }, [onRemove]);

  const getFileName = useCallback((uri: string) => {
    const parts = uri.split("/");
    return parts[parts.length - 1] || "Unknown";
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <AtomicText
            type="bodyMedium"
            style={{
              color: tokens.colors.textPrimary,
              fontWeight: "600",
              marginBottom: 8,
            }}
          >
            Audio File
          </AtomicText>
          <AudioFileSelector
            audioUri={formState.audioUri}
            onPickAudio={handlePickAudio}
            getFileName={getFileName}
          />
        </View>

        <VolumeSelector volume={formState.volume} onVolumeChange={setVolume} />

        <FadeEffectsSelector
          fadeIn={formState.fadeIn}
          fadeOut={formState.fadeOut}
          onFadeInChange={setFadeIn}
          onFadeOutChange={setFadeOut}
        />

        <InfoBanner />
      </ScrollView>

      <AudioEditorActions
        hasAudio={!!audio}
        onRemove={handleRemoveAudio}
        onCancel={onCancel}
        onSave={handleSave}
        isValid={isValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
});
