/**
 * ExportActions Component
 * Action buttons for export dialog
 */

import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AtomicText, AtomicIcon, AtomicSpinner } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

interface ExportActionsProps {
  isExporting: boolean;
  onCancel: () => void;
  onExport: () => void;
}

export const ExportActions: React.FC<ExportActionsProps> = ({
  isExporting,
  onCancel,
  onExport,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.actions}>
      <TouchableOpacity
        style={[
          styles.actionButton,
          styles.cancelButton,
          {
            borderColor: tokens.colors.borderLight,
            opacity: isExporting ? 0.5 : 1,
          },
        ]}
        onPress={onCancel}
        disabled={isExporting}
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
          styles.exportButton,
          {
            backgroundColor: tokens.colors.primary,
            opacity: isExporting ? 0.7 : 1,
          },
        ]}
        onPress={onExport}
        disabled={isExporting}
      >
        {isExporting ? (
          <AtomicSpinner size="sm" color="white" />
        ) : (
          <AtomicIcon name="download-outline" size="sm" color="onSurface" />
        )}
        <AtomicText
          type="bodyMedium"
          style={{ color: tokens.colors.onPrimary, fontWeight: "600", marginLeft: 8 }}
        >
          {isExporting ? "Exporting..." : "Export Video"}
        </AtomicText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    borderWidth: 1,
  },
  exportButton: {
    // backgroundColor set dynamically
  },
});
