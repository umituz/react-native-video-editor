/**
 * AnimationEditorActions Component
 * Action buttons for animation editor
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

interface AnimationEditorActionsProps {
  hasAnimation: boolean;
  onRemove?: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export const AnimationEditorActions: React.FC<AnimationEditorActionsProps> = ({
  hasAnimation,
  onRemove,
  onCancel,
  onSave,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.actions}>
      {hasAnimation && onRemove && (
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.removeButton,
            { borderColor: tokens.colors.error },
          ]}
          onPress={onRemove}
        >
          <AtomicIcon name="trash-outline" size="sm" color="error" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[
          styles.actionButton,
          styles.cancelButton,
          { borderColor: tokens.colors.borderLight },
        ]}
        onPress={onCancel}
      >
        <AtomicText
          type="bodyMedium"
          style={{ color: tokens.colors.textSecondary }}
        >
          Cancel
        </AtomicText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.actionButton,
          styles.saveButton,
          { backgroundColor: tokens.colors.primary },
        ]}
        onPress={onSave}
      >
        <AtomicIcon name="checkmark-outline" size="sm" color="onSurface" />
        <AtomicText
          type="bodyMedium"
          style={{ color: tokens.colors.onPrimary, fontWeight: "600", marginLeft: 6 }}
        >
          Apply
        </AtomicText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButton: {
    flex: 0,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  cancelButton: {
    borderWidth: 1,
  },
  saveButton: {
    // backgroundColor set dynamically
  },
});
