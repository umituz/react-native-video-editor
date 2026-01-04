/**
 * AnimationEditor Component
 * Main component for editing animation layers
 */

import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import type { Animation } from "../../domain/entities";
import { useAnimationLayerForm } from "../hooks/useAnimationLayerForm";
import {
  DURATIONS,
  DELAYS,
  EASINGS,
  type Easing,
} from "../../infrastructure/constants/animation-layer.constants";
import { ValueSelector } from "./shape-layer/ValueSelector";
import { OptionSelector } from "./text-layer/OptionSelector";
import {
  AnimationTypeSelector,
  AnimationEditorActions,
} from "./animation-layer";
import { AnimationInfoBanner } from "./animation-layer";

interface AnimationEditorProps {
  animation?: Animation;
  onSave: (animation: Animation) => void;
  onRemove?: () => void;
  onCancel: () => void;
}

export const AnimationEditor: React.FC<AnimationEditorProps> = ({
  animation,
  onSave,
  onRemove,
  onCancel,
}) => {
  const {
    formState,
    setAnimationType,
    setDuration,
    setDelay,
    setEasing,
    buildAnimationData,
  } = useAnimationLayerForm(animation);

  const handleSave = () => {
    onSave(buildAnimationData());
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AnimationTypeSelector
          selectedType={formState.animationType}
          onTypeChange={setAnimationType}
        />

        {formState.animationType !== "none" && (
          <>
            <ValueSelector
              title="Duration"
              value={formState.duration}
              options={DURATIONS}
              formatValue={(val) => `${val}ms`}
              onValueChange={setDuration}
            />

            <ValueSelector
              title="Delay"
              value={formState.delay}
              options={DELAYS}
              formatValue={(val) => `${val}ms`}
              onValueChange={setDelay}
            />

            <OptionSelector
              title="Easing"
              options={EASINGS}
              selectedValue={formState.easing}
              onValueChange={(value) => setEasing(value as Easing)}
            />

            <AnimationInfoBanner />
          </>
        )}
      </ScrollView>

      <AnimationEditorActions
        hasAnimation={!!animation}
        onRemove={onRemove}
        onCancel={onCancel}
        onSave={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});
