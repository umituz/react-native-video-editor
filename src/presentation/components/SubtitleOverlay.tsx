/**
 * SubtitleOverlay Component
 * Renders the active subtitle on top of the video at the correct position
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { FONT_SIZE_MAP } from "../../infrastructure/constants/subtitle.constants";
import type { Subtitle } from "../../domain/entities/video-project.types";

interface SubtitleOverlayProps {
  subtitle: Subtitle | null;
}

export const SubtitleOverlay: React.FC<SubtitleOverlayProps> = ({ subtitle }) => {
  if (!subtitle) return null;

  const positionStyle =
    subtitle.style.position === "top"
      ? styles.top
      : subtitle.style.position === "center"
      ? styles.center
      : styles.bottom;

  return (
    <View style={[styles.overlay, positionStyle]} pointerEvents="none">
      <View style={[styles.bubble, { backgroundColor: subtitle.style.backgroundColor }]}>
        <AtomicText
          style={{
            color: subtitle.style.fontColor,
            fontSize: FONT_SIZE_MAP[subtitle.style.fontSize],
            textAlign: "center",
          }}
        >
          {subtitle.text}
        </AtomicText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 16,
    right: 16,
    alignItems: "center",
  },
  top: { top: 16 },
  center: { top: "40%" },
  bottom: { bottom: 16 },
  bubble: {
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
