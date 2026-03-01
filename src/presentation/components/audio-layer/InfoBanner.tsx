/**
 * InfoBanner Component
 * Info banner for audio layer editor
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

export const InfoBanner: React.FC = () => {
  const tokens = useAppDesignTokens();

  return (
    <View
      style={[
        styles.infoBanner,
        { backgroundColor: tokens.colors.primary + "20" },
      ]}
    >
      <AtomicIcon name="information-circle-outline" size="sm" color="primary" />
      <AtomicText
        type="labelSmall"
        style={{ color: tokens.colors.primary, marginLeft: 8, flex: 1 }}
      >
        Audio will play as background music for this scene
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
});
