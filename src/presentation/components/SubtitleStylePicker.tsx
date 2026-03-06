/**
 * SubtitleStylePicker Component
 * Font size, color, background, position pickers + live preview
 */

import React, { useMemo } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import {
  FONT_SIZE_MAP,
  SUBTITLE_FONT_COLORS,
  SUBTITLE_BG_COLORS,
} from "../../infrastructure/constants/subtitle.constants";
import type { SubtitleStyle } from "../../domain/entities/video-project.types";

interface SubtitleStylePickerProps {
  style: SubtitleStyle;
  previewText: string;
  onChange: (style: SubtitleStyle) => void;
  t: (key: string) => string;
}

const FONT_SIZES: SubtitleStyle["fontSize"][] = ["small", "medium", "large", "extraLarge"];
const POSITIONS: SubtitleStyle["position"][] = ["top", "center", "bottom"];

export const SubtitleStylePicker: React.FC<SubtitleStylePickerProps> = ({
  style,
  previewText,
  onChange,
  t,
}) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(() => StyleSheet.create({
    section: { marginTop: tokens.spacing.md },
    sectionLabel: { marginBottom: tokens.spacing.sm },
    row: { flexDirection: "row", gap: tokens.spacing.sm, flexWrap: "wrap" },
    optionBtn: {
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      borderRadius: tokens.borders.radius.md,
      backgroundColor: tokens.colors.surface,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    optionBtnActive: {
      backgroundColor: tokens.colors.primaryContainer,
      borderColor: tokens.colors.primary,
    },
    colorRow: { flexDirection: "row", gap: tokens.spacing.sm },
    colorBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
    },
    colorBtnActive: {
      borderColor: tokens.colors.primary,
    },
    previewBox: {
      height: 72,
      backgroundColor: tokens.colors.surfaceVariant,
      borderRadius: tokens.borders.radius.md,
      marginTop: tokens.spacing.md,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: tokens.colors.border,
      overflow: "hidden",
    },
    previewBubble: {
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.xs,
      borderRadius: tokens.borders.radius.sm,
    },
  }), [tokens]);

  const update = (patch: Partial<SubtitleStyle>) => onChange({ ...style, ...patch });

  return (
    <View>
      {/* Font size */}
      <View style={styles.section}>
        <AtomicText type="labelSmall" color="textSecondary" style={styles.sectionLabel}>
          {t("subtitle.style.fontSize") || "Size"}
        </AtomicText>
        <View style={styles.row}>
          {FONT_SIZES.map((size) => (
            <TouchableOpacity
              key={size}
              style={[styles.optionBtn, style.fontSize === size && styles.optionBtnActive]}
              onPress={() => update({ fontSize: size })}
              accessibilityRole="button"
            >
              <AtomicText
                type="labelSmall"
                color={style.fontSize === size ? "primary" : "textSecondary"}
              >
                {size}
              </AtomicText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Font color */}
      <View style={styles.section}>
        <AtomicText type="labelSmall" color="textSecondary" style={styles.sectionLabel}>
          {t("subtitle.style.fontColor") || "Color"}
        </AtomicText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.colorRow}>
            {SUBTITLE_FONT_COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[styles.colorBtn, { backgroundColor: color }, style.fontColor === color && styles.colorBtnActive]}
                onPress={() => update({ fontColor: color })}
                accessibilityRole="button"
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Background */}
      <View style={styles.section}>
        <AtomicText type="labelSmall" color="textSecondary" style={styles.sectionLabel}>
          {t("subtitle.style.background") || "Background"}
        </AtomicText>
        <View style={styles.row}>
          {SUBTITLE_BG_COLORS.map((bg) => (
            <TouchableOpacity
              key={bg.value}
              style={[styles.optionBtn, style.backgroundColor === bg.value && styles.optionBtnActive]}
              onPress={() => update({ backgroundColor: bg.value })}
              accessibilityRole="button"
            >
              <AtomicText
                type="labelSmall"
                color={style.backgroundColor === bg.value ? "primary" : "textSecondary"}
              >
                {bg.label}
              </AtomicText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Position */}
      <View style={styles.section}>
        <AtomicText type="labelSmall" color="textSecondary" style={styles.sectionLabel}>
          {t("subtitle.style.position") || "Position"}
        </AtomicText>
        <View style={styles.row}>
          {POSITIONS.map((pos) => (
            <TouchableOpacity
              key={pos}
              style={[styles.optionBtn, style.position === pos && styles.optionBtnActive]}
              onPress={() => update({ position: pos })}
              accessibilityRole="button"
            >
              <AtomicText
                type="labelSmall"
                color={style.position === pos ? "primary" : "textSecondary"}
              >
                {pos}
              </AtomicText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Preview */}
      <View style={styles.previewBox}>
        <View style={[styles.previewBubble, { backgroundColor: style.backgroundColor }]}>
          <AtomicText
            style={{ color: style.fontColor, fontSize: FONT_SIZE_MAP[style.fontSize] * 0.75, textAlign: "center" }}
          >
            {previewText || t("subtitle.preview.placeholder") || "Preview text"}
          </AtomicText>
        </View>
      </View>
    </View>
  );
};
