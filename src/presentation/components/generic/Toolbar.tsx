/**
 * Generic Toolbar Component
 * Replaces: EditorToolPanel and similar toolbar patterns
 */

import React, { useMemo } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

export interface ToolbarButton {
  id: string;
  icon: string;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  destructive?: boolean;
  showBadge?: boolean;
  badgeColor?: string;
  testID?: string;
}

export interface ToolbarSection {
  id: string;
  buttons: ToolbarButton[];
}

export interface ToolbarProps {
  sections: ToolbarSection[];
  orientation?: "horizontal" | "vertical";
  scrollable?: boolean;
  testID?: string;
}

const ToolbarButtonComp = React.memo<{ button: ToolbarButton; styles: any }>(({ button, styles }) => (
  <TouchableOpacity
    style={[styles.button, button.destructive && styles.buttonDestructive, button.disabled && styles.buttonDisabled]}
    onPress={button.onPress}
    disabled={button.disabled}
    testID={button.testID}
    accessibilityRole="button"
    accessibilityLabel={button.label}
  >
    <AtomicIcon name={button.icon as any} size="sm" color={button.destructive ? "error" : "primary"} />
    <AtomicText type="labelSmall" style={styles.label}>{button.label}</AtomicText>
    {button.showBadge && <View style={[styles.badge, { backgroundColor: button.badgeColor }]}><AtomicText style={styles.badgeText}>!</AtomicText></View>}
  </TouchableOpacity>
));

ToolbarButtonComp.displayName = "ToolbarButton";

export function Toolbar({ sections, orientation = "horizontal", scrollable = false, testID = "toolbar" }: ToolbarProps) {
  const tokens = useAppDesignTokens();
  const styles = useMemo(() => StyleSheet.create({
    container: { backgroundColor: tokens.colors.surface, borderRadius: tokens.borders.radius.lg, padding: tokens.spacing.sm },
    scrollContent: { gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.sm },
    sectionContainer: { gap: tokens.spacing.sm },
    button: { alignItems: "center", padding: tokens.spacing.sm, borderRadius: tokens.borders.radius.md, gap: tokens.spacing.xs, backgroundColor: tokens.colors.surfaceVariant, borderWidth: 1, borderColor: tokens.colors.border, minWidth: orientation === "horizontal" ? 60 : 50 },
    buttonDestructive: { backgroundColor: `${tokens.colors.error}10`, borderColor: tokens.colors.error },
    buttonDisabled: { opacity: 0.4 },
    label: { color: tokens.colors.textPrimary },
    badge: { position: "absolute", top: -4, right: -4, minWidth: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: tokens.colors.surface, alignItems: "center", justifyContent: "center" },
    badgeText: { color: tokens.colors.onPrimary, fontSize: 10, fontWeight: "bold" },
  }), [tokens, orientation]);

  const content = sections.map((section) => (
    <View key={section.id} style={styles.sectionContainer}>
      {section.buttons.map((button) => <ToolbarButtonComp key={button.id} button={button} styles={styles} />)}
    </View>
  ));

  return (
    <View style={styles.container} testID={testID}>
      {scrollable ? <ScrollView horizontal={orientation === "horizontal"} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>{content}</ScrollView> : content}
    </View>
  );
}
