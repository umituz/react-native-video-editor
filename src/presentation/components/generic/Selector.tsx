/**
 * Universal Selector Component
 * Replaces: OptionSelector, FontSizeSelector, TextAlignSelector, ShapeTypeSelector, etc.
 */

import React, { useMemo } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

export interface SelectorItem<T = string> {
  value: T;
  label: string;
  icon?: string;
  color?: string;
  disabled?: boolean;
}

export interface SelectorProps<T = string> {
  items: SelectorItem<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
  orientation?: "horizontal" | "vertical" | "grid";
  itemWidth?: number;
  itemHeight?: number;
  icon?: boolean;
  colorPreview?: boolean;
  testID?: string;
}

const SelectorItem = React.memo<{ item: SelectorItem; isSelected: boolean; onSelect: () => void; styles: any; icon: boolean; colorPreview: boolean }>(
  ({ item, isSelected, onSelect, styles, icon, colorPreview }) => (
    <TouchableOpacity
      style={[styles.item, isSelected && styles.itemSelected, item.disabled && styles.itemDisabled]}
      onPress={onSelect}
      disabled={item.disabled}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={item.label}
    >
      {colorPreview && item.color && <View style={[styles.colorPreview, { backgroundColor: item.color }]} />}
      {icon && item.icon && <AtomicIcon name={item.icon} size="sm" color="textPrimary" />}
      <AtomicText type="labelSmall" style={styles.label} color={isSelected ? "primary" : "textPrimary"}>{item.label}</AtomicText>
    </TouchableOpacity>
  )
);

SelectorItem.displayName = "SelectorItem";

export function Selector<T = string>({
  items,
  selectedValue,
  onSelect,
  orientation = "horizontal",
  itemWidth = 80,
  itemHeight = 40,
  icon = false,
  colorPreview = false,
  testID = "selector",
}: SelectorProps<T>) {
  const tokens = useAppDesignTokens();
  const styles = useMemo(() => StyleSheet.create({
    container: { gap: tokens.spacing.sm },
    scrollContent: { gap: tokens.spacing.sm, paddingHorizontal: orientation === "horizontal" ? tokens.spacing.md : 0 },
    gridContainer: { flexDirection: "row", flexWrap: "wrap", gap: tokens.spacing.sm },
    item: { width: orientation === "grid" ? undefined : itemWidth, height: itemHeight, borderRadius: tokens.borders.radius.md, borderWidth: 1, borderColor: tokens.colors.border, backgroundColor: tokens.colors.surface, alignItems: "center", justifyContent: "center", paddingHorizontal: tokens.spacing.md },
    itemSelected: { borderColor: tokens.colors.primary, backgroundColor: `${tokens.colors.primary}20` },
    itemDisabled: { opacity: 0.4 },
    label: { color: tokens.colors.textPrimary },
    colorPreview: { width: 24, height: 24, borderRadius: 12 },
  }), [tokens, orientation, itemWidth, itemHeight]);

  const content = items.map((item) => (
    <SelectorItem
      key={String(item.value)}
      item={item}
      isSelected={item.value === selectedValue}
      onSelect={() => onSelect(item.value)}
      styles={styles}
      icon={icon}
      colorPreview={colorPreview}
    />
  ));

  return (
    <View style={styles.container} testID={testID}>
      {orientation === "horizontal" ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {content}
        </ScrollView>
      ) : (
        <View style={styles.gridContainer}>{content}</View>
      )}
    </View>
  );
}
