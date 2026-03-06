/**
 * CollageEditorCanvas Component
 * Collage layout canvas with image cells, layout picker, spacing and border radius controls
 */

import React, { useMemo } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { COLLAGE_LAYOUTS } from "../../infrastructure/constants/collage.constants";
import type { CollageLayout } from "../../infrastructure/constants/collage.constants";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface CollageEditorCanvasProps {
  layout: CollageLayout;
  images: (string | null)[];
  spacing: number;
  borderRadius: number;
  onSelectLayout: (layout: CollageLayout) => void;
  onCellPress: (index: number) => void;
  onSpacingChange: (value: number) => void;
  onBorderRadiusChange: (value: number) => void;
  t: (key: string) => string;
  canvasSize?: number;
}

export const CollageEditorCanvas: React.FC<CollageEditorCanvasProps> = ({
  layout,
  images,
  spacing,
  borderRadius,
  onSelectLayout,
  onCellPress,
  onSpacingChange,
  onBorderRadiusChange,
  t,
  canvasSize,
}) => {
  const tokens = useAppDesignTokens();
  const size = canvasSize ?? SCREEN_WIDTH - tokens.spacing.md * 2;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        canvas: {
          width: size,
          height: size,
          alignSelf: "center",
          position: "relative",
          backgroundColor: tokens.colors.surface,
          borderRadius: tokens.borders.radius.md,
          overflow: "hidden",
        },
        cell: {
          position: "absolute",
          overflow: "hidden",
        },
        cellImage: {
          width: "100%",
          height: "100%",
        },
        cellEmpty: {
          flex: 1,
          backgroundColor: tokens.colors.surfaceVariant,
          alignItems: "center",
          justifyContent: "center",
        },
        controls: {
          paddingHorizontal: tokens.spacing.md,
          paddingTop: tokens.spacing.md,
          gap: tokens.spacing.sm,
        },
        controlRow: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        stepper: {
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing.sm,
        },
        stepBtn: {
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: tokens.colors.surfaceVariant,
          alignItems: "center",
          justifyContent: "center",
        },
        stepValue: {
          minWidth: 28,
          textAlign: "center",
        },
        layoutSection: {
          paddingTop: tokens.spacing.sm,
        },
        layoutScroll: {
          paddingHorizontal: tokens.spacing.md,
          gap: tokens.spacing.sm,
        },
        layoutCard: {
          width: 64,
          alignItems: "center",
          gap: tokens.spacing.xs,
        },
        layoutPreview: {
          width: 52,
          height: 52,
          borderRadius: tokens.borders.radius.sm,
          overflow: "hidden",
          position: "relative",
          backgroundColor: tokens.colors.surfaceVariant,
          borderWidth: 2,
          borderColor: "transparent",
        },
        layoutPreviewActive: {
          borderColor: tokens.colors.primary,
        },
      }),
    [tokens, size],
  );

  return (
    <View>
      {/* Canvas */}
      <View style={styles.canvas}>
        {layout.grid.map((cell, index) => {
          const [cx, cy, cw, ch] = cell;
          const cellStyle = {
            left: cx * size + spacing,
            top: cy * size + spacing,
            width: cw * size - spacing * 2,
            height: ch * size - spacing * 2,
            borderRadius,
          };
          return (
            <TouchableOpacity
              key={index}
              style={[styles.cell, cellStyle]}
              onPress={() => onCellPress(index)}
              accessibilityLabel={`Cell ${index + 1}`}
              accessibilityRole="button"
            >
              {images[index] ? (
                <Image
                  source={{ uri: images[index]! }}
                  style={[styles.cellImage, { borderRadius }]}
                  contentFit="cover"
                />
              ) : (
                <View style={styles.cellEmpty}>
                  <AtomicIcon name="add" size="md" color="textSecondary" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Spacing + Border Radius */}
      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <AtomicText type="labelSmall" color="textSecondary">
            {t("editor.collage.spacing") || "Spacing"}
          </AtomicText>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => onSpacingChange(Math.max(0, spacing - 2))}
              accessibilityLabel="Decrease spacing"
              accessibilityRole="button"
            >
              <AtomicIcon name="chevron-back" size="sm" color="textSecondary" />
            </TouchableOpacity>
            <AtomicText fontWeight="bold" style={styles.stepValue}>
              {spacing}
            </AtomicText>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => onSpacingChange(Math.min(16, spacing + 2))}
              accessibilityLabel="Increase spacing"
              accessibilityRole="button"
            >
              <AtomicIcon name="chevron-forward" size="sm" color="textSecondary" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.controlRow}>
          <AtomicText type="labelSmall" color="textSecondary">
            {t("editor.collage.corners") || "Corners"}
          </AtomicText>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => onBorderRadiusChange(Math.max(0, borderRadius - 4))}
              accessibilityLabel="Decrease corner radius"
              accessibilityRole="button"
            >
              <AtomicIcon name="chevron-back" size="sm" color="textSecondary" />
            </TouchableOpacity>
            <AtomicText fontWeight="bold" style={styles.stepValue}>
              {borderRadius}
            </AtomicText>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => onBorderRadiusChange(Math.min(24, borderRadius + 4))}
              accessibilityLabel="Increase corner radius"
              accessibilityRole="button"
            >
              <AtomicIcon name="chevron-forward" size="sm" color="textSecondary" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Layout Picker */}
      <View style={styles.layoutSection}>
        <AtomicText
          type="labelSmall"
          color="textSecondary"
          style={{ paddingHorizontal: tokens.spacing.md, marginBottom: tokens.spacing.xs }}
        >
          {t("editor.collage.layout") || "Layout"}
        </AtomicText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.layoutScroll}
        >
          {COLLAGE_LAYOUTS.map((l) => {
            const isActive = layout.id === l.id;
            return (
              <TouchableOpacity
                key={l.id}
                style={styles.layoutCard}
                onPress={() => onSelectLayout(l)}
                accessibilityLabel={`Layout ${l.count} cells`}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                <View style={[styles.layoutPreview, isActive && styles.layoutPreviewActive]}>
                  {l.grid.map((cell, i) => {
                    const [lx, ly, lw, lh] = cell;
                    return (
                      <View
                        key={i}
                        style={{
                          position: "absolute",
                          left: lx * 52 + 2,
                          top: ly * 52 + 2,
                          width: lw * 52 - 4,
                          height: lh * 52 - 4,
                          backgroundColor: isActive
                            ? tokens.colors.primary
                            : tokens.colors.surfaceVariant,
                          borderRadius: 2,
                        }}
                      />
                    );
                  })}
                </View>
                <AtomicText
                  type="labelSmall"
                  color={isActive ? "primary" : "textSecondary"}
                >
                  {l.count}
                </AtomicText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
