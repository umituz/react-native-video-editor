/**
 * AudioEditor Component
 * Main component for editing audio layers
 */

import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useLocalization } from "@umituz/react-native-settings";
import type { Audio } from "../../domain/entities";
import { useAudioLayerForm } from "../hooks/useAudioLayerForm";
import { AUDIO_FILE_TYPES } from "../../infrastructure/constants/audio-layer.constants";
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
  const { t } = useLocalization();
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
    } catch {
      Alert.alert(t("audio.errors.pickFailed"));
    }
  }, [setAudioUri, t]);

  const handleSave = useCallback(() => {
    if (!isValid) {
      Alert.alert(t("audio.errors.noFile"));
      return;
    }
    onSave(buildAudioData());
  }, [isValid, buildAudioData, onSave, t]);

  const handleRemoveAudio = useCallback(() => {
    Alert.alert(
      t("audio.remove.title"),
      t("audio.remove.message"),
      [
        { text: t("common.buttons.cancel"), style: "cancel" },
        {
          text: t("audio.remove.confirm"),
          style: "destructive",
          onPress: () => {
            onRemove?.();
          },
        },
      ],
    );
  }, [onRemove, t]);

  const getFileName = useCallback((uri: string) => {
    const parts = uri.split("/");
    return parts[parts.length - 1] || t("audio.unknownFile");
  }, [t]);

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
            {t("audio.file.title")}
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
