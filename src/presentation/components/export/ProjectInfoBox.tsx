/**
 * ProjectInfoBox Component
 * Project information display for export dialog
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { VideoProject } from "../../../domain/entities";

interface ProjectInfoBoxProps {
  project: VideoProject;
  duration: number;
  estimatedSize: string;
}

export const ProjectInfoBox: React.FC<ProjectInfoBoxProps> = ({
  project,
  duration,
  estimatedSize,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={[styles.infoBox, { backgroundColor: tokens.colors.surface }]}>
      <View style={styles.infoRow}>
        <AtomicIcon name="film-outline" size="md" color="primary" />
        <View style={{ marginLeft: 12 }}>
          <AtomicText
            type="bodyMedium"
            style={{ color: tokens.colors.textPrimary, fontWeight: "600" }}
          >
            {project.title}
          </AtomicText>
          <AtomicText
            type="labelSmall"
            style={{ color: tokens.colors.textSecondary, marginTop: 2 }}
          >
            Duration: {duration}s • Est. size: {estimatedSize} MB
          </AtomicText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
