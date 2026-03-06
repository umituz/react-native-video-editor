/**
 * VideoFilterPicker Component
 * Horizontal filter selector with color preview dots
 */

import React, { useMemo } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { FILTER_PRESETS } from "../../infrastructure/constants/filter.constants";
import type { FilterPreset } from "../../domain/entities";

interface VideoFilterPickerProps {
  activeFilter: FilterPreset;
  onSelectFilter: (filter: FilterPreset) => void;
  t: (key: string) => string;
}

export const VideoFilterPicker: React.FC<VideoFilterPickerProps> = ({
  activeFilter,
  onSelectFilter,
  t,
}) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { paddingVertical: tokens.spacing.sm },
        label: {
          paddingHorizontal: tokens.spacing.md,
          marginBottom: tokens.spacing.sm,
        },
        scroll: { paddingHorizontal: tokens.spacing.md, gap: tokens.spacing.md },
        item: { alignItems: "center", gap: tokens.spacing.xs },
        dot: {
          width: 48,
          height: 48,
          borderRadius: 24,
          borderWidth: 2,
          borderColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: tokens.colors.surfaceVariant,
        },
        dotActive: {
          borderColor: tokens.colors.primary,
        },
      }),
    [tokens],
  );

  return (
    <View style={styles.container}>
      <AtomicText type="labelSmall" color="textSecondary" style={styles.label}>
        {t("editor.filters") || "Filters"}
      </AtomicText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {FILTER_PRESETS.map((filter) => {
          const isActive = activeFilter.id === filter.id;
          const isNone = filter.id === "none";
          return (
            <TouchableOpacity
              key={filter.id}
              style={styles.item}
              onPress={() => onSelectFilter(filter)}
              accessibilityLabel={filter.name}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <View
                style={[
                  styles.dot,
                  isActive && styles.dotActive,
                  !isNone && { backgroundColor: filter.overlay },
                ]}
              >
                {isNone && (
                  <AtomicIcon name="close" size="sm" color="textSecondary" />
                )}
              </View>
              <AtomicText
                type="labelSmall"
                color={isActive ? "primary" : "textSecondary"}
              >
                {filter.name}
              </AtomicText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
