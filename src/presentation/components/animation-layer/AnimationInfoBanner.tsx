/**
 * AnimationInfoBanner Component
 * Info banner for animation editor
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export const AnimationInfoBanner: React.FC = () => {
  const tokens = useAppDesignTokens();

  return (
    <View
      style={[
        styles.infoBanner,
        { backgroundColor: tokens.colors.primary + "20" },
      ]}
    >
      <AtomicIcon name="Info" size="sm" color="primary" />
      <AtomicText
        type="labelSmall"
        style={{ color: tokens.colors.primary, marginLeft: 8, flex: 1 }}
      >
        Animation will play when the layer first appears in the scene
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
    marginBottom: 8,
  },
});
