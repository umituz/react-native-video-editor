/**
 * EditorActions Component
 * Action buttons for layer editors
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

interface EditorActionsProps {
  onCancel: () => void;
  onSave: () => void;
  saveLabel: string;
  isValid: boolean;
}

export const EditorActions: React.FC<EditorActionsProps> = ({
  onCancel,
  onSave,
  saveLabel,
  isValid,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View
      style={[styles.actions, { borderTopColor: tokens.colors.borderLight }]}
    >
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
          {t("common.buttons.cancel")}
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
        <AtomicText
          type="bodyMedium"
          style={{ color: tokens.colors.onPrimary, fontWeight: "600" }}
        >
          {saveLabel}
        </AtomicText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    borderWidth: 1,
  },
  saveButton: {
    // backgroundColor set dynamically
  },
});
