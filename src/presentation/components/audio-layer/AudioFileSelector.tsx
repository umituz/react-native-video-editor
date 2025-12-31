/**
 * AudioFileSelector Component
 * Audio file selection for audio layer editor
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { SUPPORTED_AUDIO_FORMATS } from "../../../constants/audio-layer.constants";

interface AudioFileSelectorProps {
  audioUri: string;
  onPickAudio: () => void;
  getFileName: (uri: string) => string;
}

export const AudioFileSelector: React.FC<AudioFileSelectorProps> = ({
  audioUri,
  onPickAudio,
  getFileName,
}) => {
  const tokens = useAppDesignTokens();

  if (audioUri) {
    return (
      <View
        style={[styles.fileCard, { backgroundColor: tokens.colors.surface }]}
      >
        <View style={styles.fileInfo}>
          <AtomicIcon name="Music" size="md" color="primary" />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <AtomicText
              type="bodySmall"
              style={{
                color: tokens.colors.textPrimary,
                fontWeight: "500",
              }}
              numberOfLines={1}
            >
              {getFileName(audioUri)}
            </AtomicText>
            <AtomicText
              type="labelSmall"
              style={{ color: tokens.colors.textSecondary, marginTop: 2 }}
            >
              {audioUri.includes("file://") ? "Local file" : "Imported"}
            </AtomicText>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.changeButton, { borderColor: tokens.colors.primary }]}
          onPress={onPickAudio}
        >
          <AtomicText
            type="labelSmall"
            style={{ color: tokens.colors.primary, fontWeight: "600" }}
          >
            Change
          </AtomicText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.pickButton, { backgroundColor: tokens.colors.surface }]}
      onPress={onPickAudio}
    >
      <AtomicIcon name="Upload" size="md" color="primary" />
      <AtomicText
        type="bodyMedium"
        style={{
          color: tokens.colors.primary,
          fontWeight: "600",
          marginTop: 8,
        }}
      >
        Select Audio File
      </AtomicText>
      <AtomicText
        type="labelSmall"
        style={{ color: tokens.colors.textSecondary, marginTop: 4 }}
      >
        {SUPPORTED_AUDIO_FORMATS}
      </AtomicText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  pickButton: {
    padding: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderStyle: "dashed",
  },
  fileCard: {
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  changeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
});
