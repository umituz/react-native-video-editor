/**
 * Editor Tool Panel Component
 * Single Responsibility: Display editor tool buttons
 */

import React, { useMemo, useCallback } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useLocalization } from "@umituz/react-native-settings";

interface EditorToolPanelProps {
  onAddText: () => void;
  onAddImage: () => void;
  onAddShape: () => void;
  onAudio: () => void;
  hasAudio: boolean;
  onFilters?: () => void;
  onSpeed?: () => void;
}

interface ToolButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  showBadge?: boolean;
  badgeColor?: string;
  badgeBorderColor?: string;
}

/**
 * Memoized ToolButton component to prevent unnecessary re-renders
 */
const ToolButton = React.memo<ToolButtonProps>(({
  icon,
  label,
  onPress,
  backgroundColor,
  textColor,
  showBadge,
  badgeColor,
  badgeBorderColor,
}) => {
  const buttonStyle = useMemo(() => [
    styles.toolButton,
    { backgroundColor }
  ], [backgroundColor]);

  const textStyle = useMemo(() => ({
    color: textColor,
    marginTop: 4
  }), [textColor]);

  const badgeStyle = useMemo(() => [
    styles.audioBadge,
    {
      backgroundColor: badgeColor,
      borderColor: badgeBorderColor,
    }
  ], [badgeColor, badgeBorderColor]);

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
    >
      <AtomicIcon name={icon as any} size="md" color="primary" />
      <AtomicText
        type="labelSmall"
        style={textStyle}
      >
        {label}
      </AtomicText>
      {showBadge && badgeColor && (
        <View style={badgeStyle} />
      )}
    </TouchableOpacity>
  );
});

ToolButton.displayName = 'ToolButton';

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

  // Memoize styles
  const containerStyle = useMemo(() => [
    styles.toolPanel,
    { backgroundColor: tokens.colors.surface }
  ], [tokens.colors.surface]);

  const titleStyle = useMemo(() => ({
    color: tokens.colors.textPrimary,
    fontWeight: "600" as const,
    marginBottom: 12,
  }), [tokens.colors.textPrimary]);

  const backgroundColor = tokens.colors.backgroundPrimary;
  const textColor = tokens.colors.textPrimary;

  // Stable callbacks
  const handleAddText = useCallback(() => onAddText(), [onAddText]);
  const handleAddImage = useCallback(() => onAddImage(), [onAddImage]);
  const handleAddShape = useCallback(() => onAddShape(), [onAddShape]);
  const handleAudio = useCallback(() => onAudio(), [onAudio]);
  const handleFilters = useCallback(() => onFilters?.(), [onFilters]);
  const handleSpeed = useCallback(() => onSpeed?.(), [onSpeed]);

  return (
    <View style={containerStyle}>
      <AtomicText
        type="bodyMedium"
        style={titleStyle}
      >
        {t("editor.tools.title")}
      </AtomicText>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ToolButton
          icon="text-outline"
          label={t("editor.tools.text")}
          onPress={handleAddText}
          backgroundColor={backgroundColor}
          textColor={textColor}
        />

        <ToolButton
          icon="image-outline"
          label={t("editor.tools.image")}
          onPress={handleAddImage}
          backgroundColor={backgroundColor}
          textColor={textColor}
        />

        <ToolButton
          icon="square-outline"
          label={t("editor.tools.shape")}
          onPress={handleAddShape}
          backgroundColor={backgroundColor}
          textColor={textColor}
        />

        <ToolButton
          icon="musical-notes-outline"
          label={t("editor.tools.audio")}
          onPress={handleAudio}
          backgroundColor={backgroundColor}
          textColor={textColor}
          showBadge={hasAudio}
          badgeColor={tokens.colors.success}
          badgeBorderColor={tokens.colors.surface}
        />

        {onFilters && (
          <ToolButton
            icon="sparkles"
            label={t("editor.tools.filters") || "Filters"}
            onPress={handleFilters}
            backgroundColor={backgroundColor}
            textColor={textColor}
          />
        )}

        {onSpeed && (
          <ToolButton
            icon="flash"
            label={t("editor.tools.speed") || "Speed"}
            onPress={handleSpeed}
            backgroundColor={backgroundColor}
            textColor={textColor}
          />
        )}
      </ScrollView>
    </View>
  );
});

EditorToolPanel.displayName = 'EditorToolPanel';

const styles = StyleSheet.create({
  toolPanel: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  toolButton: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  audioBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
});
