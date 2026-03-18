/**
 * CollageLayoutSelector Component
 * Layout picker for collage editor
 */

import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { COLLAGE_LAYOUTS } from "../../../infrastructure/constants/collage.constants";
import type { CollageLayout } from "../../../infrastructure/constants/collage.constants";

interface CollageLayoutSelectorProps {
  selected: CollageLayout;
  onSelect: (layout: CollageLayout) => void;
}

export const CollageLayoutSelector: React.FC<CollageLayoutSelectorProps> = ({
  selected,
  onSelect,
}) => {
  const tokens = useAppDesignTokens();

  const styles = {
    layoutSection: {
      paddingTop: tokens.spacing.sm,
    },
    layoutScroll: {
      paddingHorizontal: tokens.spacing.md,
      gap: tokens.spacing.sm,
    },
    layoutCard: {
      width: 64,
      alignItems: "center" as const,
      gap: tokens.spacing.xs,
    },
    layoutPreview: {
      width: 52,
      height: 52,
      borderRadius: tokens.borders.radius.sm,
      overflow: "hidden" as const,
      position: "relative" as const,
      backgroundColor: tokens.colors.surfaceVariant,
      borderWidth: 2,
      borderColor: "transparent",
    },
    layoutPreviewActive: {
      borderColor: tokens.colors.primary,
    },
  };

  return (
    <View style={styles.layoutSection}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.layoutScroll}
      >
        {COLLAGE_LAYOUTS.map((layout) => (
          <TouchableOpacity
            key={layout.id}
            style={styles.layoutCard}
            onPress={() => onSelect(layout)}
            accessibilityLabel={`Layout ${layout.id}`}
            accessibilityRole="button"
            accessibilityState={{ selected: selected.id === layout.id }}
          >
            <View
              style={[
                styles.layoutPreview,
                selected.id === layout.id && styles.layoutPreviewActive,
              ]}
            >
              {layout.grid.map((cell, index) => {
                const [cx, cy, cw, ch] = cell;
                return (
                  <View
                    key={index}
                    style={{
                      position: "absolute",
                      left: `${cx * 100}%`,
                      top: `${cy * 100}%`,
                      width: `${cw * 100}%`,
                      height: `${ch * 100}%`,
                      borderWidth: 1,
                      borderColor: tokens.colors.border,
                      backgroundColor:
                        selected.id === layout.id
                          ? tokens.colors.primaryContainer
                          : "transparent",
                    }}
                  />
                );
              })}
            </View>
            <AtomicText type="caption" color="textSecondary">
              {layout.name}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
