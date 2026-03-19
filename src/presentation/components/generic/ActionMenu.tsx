/**
 * Generic Action Menu Component
 * Single Responsibility: Display action menu with selectable items
 * Replaces: LayerActionsMenu, SceneActionsMenu, SubtitleListPanel actions
 *
 * Features:
 * - Vertical list of actions
 * - Icons + labels
 * - Disabled states
 * - Destructive action styling
 */

import React, { useMemo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

export interface ActionMenuItem {
  id: string;
  label: string;
  icon?: string;
  destructive?: boolean;
  disabled?: boolean;
  testID?: string;
}

export interface ActionMenuProps {
  actions: ActionMenuItem[];
  onSelect: (actionId: string) => void;
  testID?: string;
}

/**
 * Generic action menu that can render any set of actions
 * Used for layer actions, scene actions, etc.
 */
export function ActionMenu({
  actions,
  onSelect,
  testID = "action-menu",
}: ActionMenuProps) {
  const tokens = useAppDesignTokens();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.borders.radius.lg,
      padding: tokens.spacing.xs,
    },
    actionItem: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      padding: tokens.spacing.md,
      borderRadius: tokens.borders.radius.md,
      gap: tokens.spacing.md,
    },
    actionItemDestructive: {
      backgroundColor: `${tokens.colors.error}10`,
    },
    actionItemDisabled: {
      opacity: 0.4,
    },
    icon: {
      width: 24,
      height: 24,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    label: {
      flex: 1,
    },
  }), [tokens]);

  return (
    <View style={styles.container} testID={testID}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={[
            styles.actionItem,
            action.destructive && styles.actionItemDestructive,
            action.disabled && styles.actionItemDisabled,
          ]}
          onPress={() => onSelect(action.id)}
          disabled={action.disabled}
          testID={action.testID}
          accessibilityRole="button"
          accessibilityLabel={action.label}
        >
          {action.icon && (
            <View style={styles.icon}>
              <AtomicIcon
                name={action.icon}
                size="sm"
                color={action.destructive ? "error" : "textPrimary"}
              />
            </View>
          )}
          <AtomicText
            style={styles.label}
            color={action.destructive ? "error" : "textPrimary"}
            fontWeight="medium"
          >
            {action.label}
          </AtomicText>
        </TouchableOpacity>
      ))}
    </View>
  );
}
