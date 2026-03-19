/**
 * Editor Tool Panel Component
 * Single Responsibility: Display editor tool buttons
 * REFACTORED: Uses generic Toolbar component (52 lines)
 */

import React, { useMemo } from "react";
import { View } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useLocalization } from "@umituz/react-native-settings";
import { Toolbar, type ToolbarButton, type ToolbarSection } from "./generic/Toolbar";

interface EditorToolPanelProps {
  onAddText: () => void;
  onAddImage: () => void;
  onAddShape: () => void;
  onAudio: () => void;
  hasAudio: boolean;
  onFilters?: () => void;
  onSpeed?: () => void;
}

export const EditorToolPanel: React.FC<EditorToolPanelProps> = React.memo(({
  onAddText,
  onAddImage,
  onAddShape,
  onAudio,
  hasAudio,
  onFilters,
  onSpeed,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  const toolbarSections = useMemo<ToolbarSection[]>(() => {
    const buttons: ToolbarButton[] = [
      {
        id: "text",
        icon: "text-outline",
        label: t("editor.tools.text"),
        onPress: onAddText,
      },
      {
        id: "image",
        icon: "image-outline",
        label: t("editor.tools.image"),
        onPress: onAddImage,
      },
      {
        id: "shape",
        icon: "square-outline",
        label: t("editor.tools.shape"),
        onPress: onAddShape,
      },
      {
        id: "audio",
        icon: "musical-notes-outline",
        label: t("editor.tools.audio"),
        onPress: onAudio,
        showBadge: hasAudio,
        badgeColor: tokens.colors.success,
      },
    ];

    if (onFilters) {
      buttons.push({
        id: "filters",
        icon: "sparkles",
        label: t("editor.tools.filters") || "Filters",
        onPress: onFilters,
      });
    }

    if (onSpeed) {
      buttons.push({
        id: "speed",
        icon: "flash",
        label: t("editor.tools.speed") || "Speed",
        onPress: onSpeed,
      });
    }

    return [{ id: "tools", buttons }];
  }, [t, onAddText, onAddImage, onAddShape, onAudio, hasAudio, onFilters, onSpeed, tokens.colors.success]);

  const containerStyle = useMemo(() => ({
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.borders.radius.lg,
    padding: tokens.spacing.md,
    marginHorizontal: tokens.spacing.md,
    marginBottom: tokens.spacing.md,
  }), [tokens.colors.surface, tokens.borders.radius.lg, tokens.spacing.md]);

  const titleStyle = useMemo(() => ({
    color: tokens.colors.textPrimary,
    fontWeight: "600" as const,
    marginBottom: tokens.spacing.sm,
  }), [tokens.colors.textPrimary, tokens.spacing.sm]);

  return (
    <View style={containerStyle}>
      <AtomicText
        type="bodyMedium"
        style={titleStyle}
      >
        {t("editor.tools.title")}
      </AtomicText>
      <Toolbar
        sections={toolbarSections}
        orientation="horizontal"
        scrollable
        testID="editor-tool-panel"
      />
    </View>
  );
});

EditorToolPanel.displayName = 'EditorToolPanel';
