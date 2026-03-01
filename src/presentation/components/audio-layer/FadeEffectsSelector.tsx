/**
 * FadeEffectsSelector Component
 * Fade in/out effects selector for audio layer
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import {
  FADE_IN_OPTIONS,
  FADE_OUT_OPTIONS,
} from "../../../infrastructure/constants/audio-layer.constants";

interface FadeEffectsSelectorProps {
  fadeIn: number;
  fadeOut: number;
  onFadeInChange: (fadeIn: number) => void;
  onFadeOutChange: (fadeOut: number) => void;
}

export const FadeEffectsSelector: React.FC<FadeEffectsSelectorProps> = ({
  fadeIn,
  fadeOut,
  onFadeInChange,
  onFadeOutChange,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.section}>
      <AtomicText
        type="bodyMedium"
        style={{
          color: tokens.colors.textPrimary,
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        Fade Effects (ms)
      </AtomicText>

      <View style={styles.fadeRow}>
        <View style={{ flex: 1 }}>
          <AtomicText
            type="labelSmall"
            style={{ color: tokens.colors.textSecondary, marginBottom: 6 }}
          >
            Fade In
          </AtomicText>
          <View style={styles.fadeButtons}>
            {FADE_IN_OPTIONS.map((val) => (
              <TouchableOpacity
                key={`in-${val}`}
                style={[
                  styles.fadeButton,
                  {
                    backgroundColor:
                      fadeIn === val
                        ? tokens.colors.primary
                        : tokens.colors.surface,
                    borderColor:
                      fadeIn === val
                        ? tokens.colors.primary
                        : tokens.colors.borderLight,
                  },
                ]}
                onPress={() => onFadeInChange(val)}
              >
                <AtomicText
                  type="labelSmall"
                  style={{
                    color:
                      fadeIn === val ? tokens.colors.onPrimary : tokens.colors.textPrimary,
                    fontSize: 11,
                  }}
                >
                  {val}
                </AtomicText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <AtomicText
            type="labelSmall"
            style={{ color: tokens.colors.textSecondary, marginBottom: 6 }}
          >
            Fade Out
          </AtomicText>
          <View style={styles.fadeButtons}>
            {FADE_OUT_OPTIONS.map((val) => (
              <TouchableOpacity
                key={`out-${val}`}
                style={[
                  styles.fadeButton,
                  {
                    backgroundColor:
                      fadeOut === val
                        ? tokens.colors.primary
                        : tokens.colors.surface,
                    borderColor:
                      fadeOut === val
                        ? tokens.colors.primary
                        : tokens.colors.borderLight,
                  },
                ]}
                onPress={() => onFadeOutChange(val)}
              >
                <AtomicText
                  type="labelSmall"
                  style={{
                    color:
                      fadeOut === val ? tokens.colors.onPrimary : tokens.colors.textPrimary,
                    fontSize: 11,
                  }}
                >
                  {val}
                </AtomicText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  fadeRow: {
    flexDirection: "row",
  },
  fadeButtons: {
    flexDirection: "row",
    gap: 6,
  },
  fadeButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
