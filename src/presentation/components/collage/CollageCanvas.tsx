/**
 * CollageCanvas Component
 * Main canvas rendering for collage editor
 */

import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { CollageLayout } from "../../../infrastructure/constants/collage.constants";

interface CollageCanvasProps {
  layout: CollageLayout;
  images: (string | null)[];
  spacing: number;
  borderRadius: number;
  onCellPress: (index: number) => void;
  size: number;
}

export const CollageCanvas: React.FC<CollageCanvasProps> = ({
  layout,
  images,
  spacing,
  borderRadius,
  onCellPress,
  size,
}) => {
  const tokens = useAppDesignTokens();

  const styles = {
    canvas: {
      width: size,
      height: size,
      alignSelf: "center" as const,
      position: "relative" as const,
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.borders.radius.md,
      overflow: "hidden" as const,
    },
    cell: {
      position: "absolute" as const,
      overflow: "hidden" as const,
    },
    cellImage: {
      width: "100%",
      height: "100%",
    },
    cellEmpty: {
      flex: 1,
      backgroundColor: tokens.colors.surfaceVariant,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
  };

  return (
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
  );
};
