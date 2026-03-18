/**
 * CollageControls Component
 * Controls for spacing and border radius in collage editor
 */

import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

interface CollageControlsProps {
  spacing: number;
  borderRadius: number;
  onSpacingChange: (value: number) => void;
  onBorderRadiusChange: (value: number) => void;
  t: (key: string) => string;
}

export const CollageControls: React.FC<CollageControlsProps> = ({
  spacing,
  borderRadius,
  onSpacingChange,
  onBorderRadiusChange,
  t,
}) => {
  const tokens = useAppDesignTokens();

  const styles = {
    controls: {
      paddingHorizontal: tokens.spacing.md,
      paddingTop: tokens.spacing.md,
      gap: tokens.spacing.sm,
    },
    controlRow: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
    },
    stepper: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: tokens.spacing.sm,
    },
    stepBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: tokens.colors.surfaceVariant,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    stepValue: {
      minWidth: 28,
      textAlign: "center" as const,
    },
  };

  return (
    <View style={styles.controls}>
      <View style={styles.controlRow}>
        <AtomicText type="labelSmall" color="textSecondary">
          {t("editor.collage.spacing") || "Spacing"}
        </AtomicText>
        <View style={styles.stepper}>
          <TouchableOpacity
            style={styles.stepBtn}
            onPress={() => onSpacingChange(Math.max(0, spacing - 2))}
            accessibilityLabel="Decrease spacing"
            accessibilityRole="button"
          >
            <AtomicIcon name="chevron-back" size="sm" color="textSecondary" />
          </TouchableOpacity>
          <AtomicText fontWeight="bold" style={styles.stepValue}>
            {spacing}
          </AtomicText>
          <TouchableOpacity
            style={styles.stepBtn}
            onPress={() => onSpacingChange(Math.min(16, spacing + 2))}
            accessibilityLabel="Increase spacing"
            accessibilityRole="button"
          >
            <AtomicIcon name="chevron-forward" size="sm" color="textSecondary" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.controlRow}>
        <AtomicText type="labelSmall" color="textSecondary">
          {t("editor.collage.borderRadius") || "Corner Radius"}
        </AtomicText>
        <View style={styles.stepper}>
          <TouchableOpacity
            style={styles.stepBtn}
            onPress={() => onBorderRadiusChange(Math.max(0, borderRadius - 4))}
            accessibilityLabel="Decrease border radius"
            accessibilityRole="button"
          >
            <AtomicIcon name="chevron-back" size="sm" color="textSecondary" />
          </TouchableOpacity>
          <AtomicText fontWeight="bold" style={styles.stepValue}>
            {borderRadius}
          </AtomicText>
          <TouchableOpacity
            style={styles.stepBtn}
            onPress={() => onBorderRadiusChange(Math.min(32, borderRadius + 4))}
            accessibilityLabel="Increase border radius"
            accessibilityRole="button"
          >
            <AtomicIcon name="chevron-forward" size="sm" color="textSecondary" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
