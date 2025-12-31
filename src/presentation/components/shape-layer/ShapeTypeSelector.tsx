/**
 * ShapeTypeSelector Component
 * Shape type selector for shape layer
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import {
  SHAPES,
  type ShapeType,
} from "../../../constants/shape-layer.constants";

interface ShapeTypeSelectorProps {
  selectedShape: ShapeType;
  onShapeChange: (shape: ShapeType) => void;
}

export const ShapeTypeSelector: React.FC<ShapeTypeSelectorProps> = ({
  selectedShape,
  onShapeChange,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.section}>
      <AtomicText
        type="bodyMedium"
        style={{
          color: tokens.colors.textPrimary,
          fontWeight: "600",
          marginBottom: 12,
        }}
      >
        Shape Type
      </AtomicText>

      <View style={styles.shapesRow}>
        {SHAPES.map((s) => (
          <TouchableOpacity
            key={s.type}
            style={[
              styles.shapeCard,
              {
                backgroundColor:
                  selectedShape === s.type
                    ? tokens.colors.primary
                    : tokens.colors.surface,
                borderColor:
                  selectedShape === s.type
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
              },
            ]}
            onPress={() => onShapeChange(s.type)}
          >
            <AtomicIcon
              name={s.icon as any}
              size="lg"
              color={selectedShape === s.type ? "onSurface" : "primary"}
            />
            <AtomicText
              type="labelSmall"
              style={{
                color:
                  selectedShape === s.type
                    ? "#FFFFFF"
                    : tokens.colors.textPrimary,
                marginTop: 8,
                fontWeight: selectedShape === s.type ? "600" : "400",
              }}
            >
              {s.label}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  shapesRow: {
    flexDirection: "row",
    gap: 12,
  },
  shapeCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
