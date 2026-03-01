/**
 * Editor Header Component
 * Single Responsibility: Display editor header with actions
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

interface EditorHeaderProps {
  projectTitle: string;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onExport: () => void;
  onBack: () => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  projectTitle,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSave,
  onExport,
  onBack,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: tokens.colors.surface,
          borderBottomColor: tokens.colors.borderLight,
        },
      ]}
    >
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <AtomicIcon name="chevron-back" size="md" color="primary" />
      </TouchableOpacity>

      <AtomicText
        type="bodyLarge"
        style={{ color: tokens.colors.textPrimary, fontWeight: "600" }}
      >
        {projectTitle}
      </AtomicText>

      <View style={styles.headerActions}>
        <TouchableOpacity
          onPress={onUndo}
          style={styles.headerButton}
          disabled={!canUndo}
        >
          <AtomicIcon name="arrow-undo" size="md" color="secondary" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onRedo}
          style={styles.headerButton}
          disabled={!canRedo}
        >
          <AtomicIcon name="arrow-redo" size="md" color="secondary" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onSave} style={styles.headerButton}>
          <AtomicIcon name="save" size="md" color="secondary" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onExport} style={styles.headerButton}>
          <AtomicIcon name="download" size="md" color="primary" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
});
