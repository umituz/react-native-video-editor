/**
 * VolumeSelector Component
 * Volume control for audio layer
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { VOLUME_OPTIONS } from "../../../infrastructure/constants/audio-layer.constants";

interface VolumeSelectorProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const VolumeSelector: React.FC<VolumeSelectorProps> = ({
  volume,
  onVolumeChange,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.section}>
      <View style={styles.sliderHeader}>
        <AtomicText
          type="bodyMedium"
          style={{ color: tokens.colors.textPrimary, fontWeight: "600" }}
        >
          Volume
        </AtomicText>
        <AtomicText
          type="bodyMedium"
          style={{ color: tokens.colors.primary, fontWeight: "600" }}
        >
          {Math.round(volume * 100)}%
        </AtomicText>
      </View>

      <View style={styles.volumeButtons}>
        {VOLUME_OPTIONS.map((val) => (
          <TouchableOpacity
            key={val}
            style={[
              styles.volumeButton,
              {
                backgroundColor:
                  volume === val
                    ? tokens.colors.primary
                    : tokens.colors.surface,
                borderColor:
                  volume === val
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
              },
            ]}
            onPress={() => onVolumeChange(val)}
          >
            <AtomicText
              type="labelSmall"
              style={{
                color: volume === val ? tokens.colors.onPrimary : tokens.colors.textPrimary,
                fontWeight: volume === val ? "600" : "400",
              }}
            >
              {Math.round(val * 100)}%
            </AtomicText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  volumeButtons: {
    flexDirection: "row",
    gap: 8,
  },
  volumeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
