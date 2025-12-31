/**
 * ExportInfoBanner Component
 * Info banner for export dialog
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export const ExportInfoBanner: React.FC = () => {
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
        Note: Full video encoding with frame rendering is a foundational
        feature. This demo simulates the export process.
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
    marginBottom: 24,
  },
});
