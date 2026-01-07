/**
 * AudioEditorActions Component
 * Action buttons for audio editor
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

interface AudioEditorActionsProps {
  hasAudio: boolean;
  onRemove?: () => void;
  onCancel: () => void;
  onSave: () => void;
  isValid: boolean;
}

export const AudioEditorActions: React.FC<AudioEditorActionsProps> = ({
  hasAudio,
  onRemove,
  onCancel,
  onSave,
  isValid,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.actions}>
      {hasAudio && onRemove && (
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.removeButton,
            { borderColor: tokens.colors.error },
          ]}
          onPress={onRemove}
        >
          <AtomicIcon name="trash-outline" size="sm" color="error" />
          <AtomicText
            type="bodyMedium"
            style={{ color: tokens.colors.error, marginLeft: 6 }}
          >
            Remove
          </AtomicText>
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
          {
            backgroundColor: isValid
              ? tokens.colors.primary
              : tokens.colors.borderLight,
          },
        ]}
        onPress={onSave}
        disabled={!isValid}
      >
        <AtomicIcon name="checkmark-outline" size="sm" color="onSurface" />
        <AtomicText
          type="bodyMedium"
          style={{ color: tokens.colors.onPrimary, fontWeight: "600", marginLeft: 6 }}
        >
          Save
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
    borderWidth: 1,
  },
  cancelButton: {
    borderWidth: 1,
  },
  saveButton: {
    // backgroundColor set dynamically
  },
});
