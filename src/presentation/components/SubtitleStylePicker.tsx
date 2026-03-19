/**
 * Subtitle Style Picker Component
 * REFACTORED: Uses generic Selector component (110 lines)
 */

import React, { useMemo } from "react";
import { View, ScrollView } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { Selector, type SelectorItem } from "./generic/Selector";
import { FONT_SIZE_MAP, SUBTITLE_FONT_COLORS, SUBTITLE_BG_COLORS } from "../../infrastructure/constants/subtitle.constants";
import type { SubtitleStyle } from "../../domain/entities/video-project.types";

interface SubtitleStylePickerProps {
  style: SubtitleStyle;
  previewText: string;
  onChange: (style: SubtitleStyle) => void;
  t: (key: string) => string;
}

const FONT_SIZES: SubtitleStyle["fontSize"][] = ["small", "medium", "large", "extraLarge"];
const POSITIONS: SubtitleStyle["position"][] = ["top", "center", "bottom"];

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const tokens = useAppDesignTokens();
  return (
    <View style={{ marginTop: tokens.spacing.md }}>
      <AtomicText type="labelSmall" color="textSecondary" style={{ marginBottom: tokens.spacing.sm }}>{title}</AtomicText>
      {children}
    </View>
  );
};

export const SubtitleStylePicker: React.FC<SubtitleStylePickerProps> = ({ style, previewText, onChange, t }) => {
  const tokens = useAppDesignTokens();

  const fontSizeItems = useMemo<SelectorItem<SubtitleStyle["fontSize"]>[]>(() => FONT_SIZES.map((size) => ({ value: size, label: size })), []);
  const fontColorItems = useMemo<SelectorItem[]>(() => SUBTITLE_FONT_COLORS.map((color) => ({ value: color, label: "", color })), []);
  const bgColorItems = useMemo<SelectorItem[]>(() => SUBTITLE_BG_COLORS.map((bg) => ({ value: bg.value, label: bg.label, color: bg.value })), []);
  const positionItems = useMemo<SelectorItem<SubtitleStyle["position"]>[]>(() => POSITIONS.map((pos) => ({ value: pos, label: pos })), []);

  return (
    <ScrollView>
      <Section title={t("subtitle.style.fontSize") || "Size"}>
        <Selector items={fontSizeItems} selectedValue={style.fontSize} onSelect={(value) => onChange({ ...style, fontSize: value })} orientation="horizontal" testID="font-size-selector" />
      </Section>

      <Section title={t("subtitle.style.fontColor") || "Color"}>
        <Selector items={fontColorItems} selectedValue={style.fontColor} onSelect={(value) => onChange({ ...style, fontColor: value })} orientation="horizontal" colorPreview testID="font-color-selector" />
      </Section>

      <Section title={t("subtitle.style.background") || "Background"}>
        <Selector items={bgColorItems} selectedValue={style.backgroundColor} onSelect={(value) => onChange({ ...style, backgroundColor: value })} orientation="horizontal" testID="bg-color-selector" />
      </Section>

      <Section title={t("subtitle.style.position") || "Position"}>
        <Selector items={positionItems} selectedValue={style.position} onSelect={(value) => onChange({ ...style, position: value })} testID="position-selector" />
      </Section>

      <View style={{ height: 72, backgroundColor: tokens.colors.surfaceVariant, borderRadius: tokens.borders.radius.md, marginTop: tokens.spacing.md, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: tokens.colors.border, overflow: "hidden" }}>
        <View style={{ paddingHorizontal: tokens.spacing.md, paddingVertical: tokens.spacing.xs, borderRadius: tokens.borders.radius.sm, backgroundColor: style.backgroundColor }}>
          <AtomicText style={{ color: style.fontColor, fontSize: FONT_SIZE_MAP[style.fontSize] * 0.75, textAlign: "center" }}>
            {previewText || t("subtitle.preview.placeholder") || "Preview text"}
          </AtomicText>
        </View>
      </View>
    </ScrollView>
  );
};
