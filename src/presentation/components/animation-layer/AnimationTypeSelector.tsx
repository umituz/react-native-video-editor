/**
 * AnimationTypeSelector Component
 * Animation type selector for animation layer
 */

import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { ANIMATION_TYPES } from "../../../infrastructure/constants/animation-layer.constants";
import type { AnimationType } from "../../../domain/entities";

interface AnimationTypeSelectorProps {
  selectedType: AnimationType;
  onTypeChange: (type: AnimationType) => void;
}

export const AnimationTypeSelector: React.FC<AnimationTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
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
        Animation Type
      </AtomicText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.animationTypesScroll}
      >
        {ANIMATION_TYPES.map((anim) => (
          <TouchableOpacity
            key={anim.type}
            style={[
              styles.animationTypeCard,
              {
                backgroundColor:
                  selectedType === anim.type
                    ? tokens.colors.primary
                    : tokens.colors.surface,
                borderColor:
                  selectedType === anim.type
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
              },
            ]}
            onPress={() => onTypeChange(anim.type)}
          >
            <AtomicIcon
              name={anim.icon as any}
              size="md"
              color={selectedType === anim.type ? "onSurface" : "primary"}
            />
            <AtomicText
              type="labelSmall"
              style={{
                color:
                  selectedType === anim.type
                    ? tokens.colors.onPrimary
                    : tokens.colors.textPrimary,
                marginTop: 6,
                fontWeight: selectedType === anim.type ? "600" : "400",
              }}
            >
              {anim.label}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  animationTypesScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  animationTypeCard: {
    width: 90,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
});
