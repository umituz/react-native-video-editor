/**
 * Universal Editor Component
 * Replaces: ImageLayerEditor, TextLayerEditor, ShapeLayerEditor, AudioEditor, AnimationEditor
 */

import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

export interface EditorSection {
  id: string;
  title?: string;
  component: React.ComponentType<any>;
  props?: Record<string, unknown>;
}

export interface EditorConfig<T = unknown> {
  sections: EditorSection[];
  preview?: React.ComponentType<{ data: T }>;
  actions?: { saveLabel?: string; cancelLabel?: string; onSave: () => void | Promise<void>; onCancel: () => void };
  isValid?: boolean;
  testID?: string;
}

export function Editor<T = unknown>({ sections, preview: Preview, actions, isValid = true, testID = "editor" }: EditorConfig<T>) {
  const tokens = useAppDesignTokens();
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: tokens.colors.surface },
    scrollContent: { padding: tokens.spacing.md, paddingBottom: tokens.spacing.xl },
    section: { marginBottom: tokens.spacing.lg },
    previewContainer: { margin: tokens.spacing.md, borderRadius: tokens.borders.radius.lg, overflow: "hidden", backgroundColor: tokens.colors.surfaceVariant },
    actionsContainer: { padding: tokens.spacing.md, borderTopWidth: 1, borderTopColor: tokens.colors.border },
  });

  return (
    <View style={styles.container} testID={testID}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {Preview && <View style={styles.previewContainer}><Preview data={undefined as T} /></View>}
        {sections.map((section) => (
          <View key={section.id} style={styles.section}>
            {section.title && <AtomicText type="labelMedium" color="textSecondary" style={{ marginBottom: tokens.spacing.sm }}>{section.title}</AtomicText>}
            <section.component {...section.props} />
          </View>
        ))}
      </ScrollView>
      {actions && (
        <View style={styles.actionsContainer}>
          <View style={{ flexDirection: "row", gap: tokens.spacing.md }}>
            <TouchableOpacity style={{ flex: 1, paddingVertical: tokens.spacing.md, borderRadius: tokens.borders.radius.md, alignItems: "center", backgroundColor: tokens.colors.surfaceVariant }} onPress={actions.onCancel}>
              <AtomicText fontWeight="medium" color="textPrimary">{actions.cancelLabel || "Cancel"}</AtomicText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, paddingVertical: tokens.spacing.md, borderRadius: tokens.borders.radius.md, alignItems: "center", backgroundColor: tokens.colors.primary, opacity: isValid ? 1 : 0.4 }}
              onPress={actions.onSave}
              disabled={!isValid}
            >
              <AtomicText fontWeight="semibold" color={isValid ? "onPrimary" : "textSecondary"}>{actions.saveLabel || "Save"}</AtomicText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
