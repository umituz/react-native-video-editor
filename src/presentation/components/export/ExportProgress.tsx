/**
 * ExportProgress Component
 * Export progress display for export dialog
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { ExportProgress as ExportProgressType } from "../../hooks/useExport";

interface ExportProgressProps {
  progress: ExportProgressType;
}

export const ExportProgress: React.FC<ExportProgressProps> = ({ progress }) => {
  const tokens = useAppDesignTokens();

  const getStatusText = () => {
    switch (progress.status) {
      case "preparing":
        return "Preparing Export...";
      case "encoding":
        return "Encoding Video...";
      case "saving":
        return "Saving Video...";
      case "complete":
        return "Export Complete!";
      case "error":
        return "Export Failed";
      default:
        return "Processing...";
    }
  };

  return (
    <View
      style={[
        styles.progressContainer,
        { backgroundColor: tokens.colors.surface },
      ]}
    >
      <View style={styles.progressHeader}>
        <AtomicText
          type="bodyMedium"
          style={{ color: tokens.colors.textPrimary, fontWeight: "600" }}
        >
          {getStatusText()}
        </AtomicText>
        <AtomicText
          type="labelSmall"
          style={{ color: tokens.colors.textSecondary, marginTop: 4 }}
        >
          {progress.message}
        </AtomicText>
      </View>

      <View
        style={[
          styles.progressBarContainer,
          { backgroundColor: tokens.colors.borderLight },
        ]}
      >
        <View
          style={[
            styles.progressBar,
            {
              backgroundColor: tokens.colors.primary,
              width: `${progress.progress}%`,
            },
          ]}
        />
      </View>

      <View style={styles.progressStats}>
        <AtomicText
          type="labelSmall"
          style={{ color: tokens.colors.textSecondary }}
        >
          {progress.currentFrame} / {progress.totalFrames} frames
        </AtomicText>
        <AtomicText
          type="labelSmall"
          style={{ color: tokens.colors.textPrimary, fontWeight: "600" }}
        >
          {progress.progress}%
        </AtomicText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  progressHeader: {
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
