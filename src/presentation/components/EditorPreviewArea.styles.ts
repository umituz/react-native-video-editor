import { StyleSheet } from "react-native";
import { DesignTokens } from "@umituz/react-native-design-system/theme";

export const createPreviewStyles = (_tokens: DesignTokens) =>
  StyleSheet.create({
    previewSection: {
      padding: 16,
    },
    previewCanvas: {
      width: "100%",
      borderRadius: 12,
      overflow: "hidden",
      position: "relative",
    },
    emptyPreview: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 60,
    },
    playbackControls: {
      marginTop: 16,
      padding: 16,
      borderRadius: 12,
    },
    playbackRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    progressBarContainer: {
      height: 4,
      borderRadius: 2,
      marginTop: 12,
      overflow: "hidden",
    },
    progressBar: {
      height: "100%",
      borderRadius: 2,
    },
    playButton: {
      padding: 8,
    },
    timeDisplay: {
      flex: 1,
      alignItems: "center",
    },
    resetButton: {
      padding: 8,
    },
    layerActionsButton: {
      position: "absolute",
      top: 16,
      right: 16,
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
    },
  });
