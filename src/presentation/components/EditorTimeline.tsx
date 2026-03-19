/**
 * Editor Timeline Component
 * Single Responsibility: Display scene timeline
 * PERFORMANCE: Uses FlatList for efficient horizontal scene rendering
 */

import React, { useMemo, useCallback } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useLocalization } from "@umituz/react-native-settings";
import type { VideoProject, Scene } from "../../domain/entities/video-project.types";

interface EditorTimelineProps {
  project: VideoProject;
  currentSceneIndex: number;
  onSceneSelect: (index: number) => void;
  onSceneLongPress: (index: number) => void;
  onAddScene: () => void;
}

interface SceneCardProps {
  scene: Scene;
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
  onLongPress: (index: number) => void;
  primaryColor: string;
  backgroundColor: string;
  borderLightColor: string;
  surfaceSecondaryColor: string;
  onPrimaryColor: string;
  textPrimaryColor: string;
}

/**
 * Memoized SceneCard component to prevent unnecessary re-renders
 * Only re-renders when its own props change, not when other scenes change
 */
const SceneCard = React.memo<SceneCardProps>(({
  scene,
  index,
  isSelected,
  onSelect,
  onLongPress,
  primaryColor,
  backgroundColor,
  borderLightColor,
  surfaceSecondaryColor,
  onPrimaryColor,
  textPrimaryColor,
}) => {
  const cardStyle = useMemo(() => [
    styles.sceneCard,
    {
      backgroundColor: isSelected ? `${primaryColor}20` : backgroundColor,
      borderColor: isSelected ? primaryColor : borderLightColor,
    },
  ], [isSelected, primaryColor, backgroundColor, borderLightColor]);

  const thumbnailStyle = useMemo(() => [
    styles.sceneThumbnail,
    {
      backgroundColor: scene.background.value || surfaceSecondaryColor,
    },
  ], [scene.background.value, surfaceSecondaryColor]);

  const textStyle = useMemo(() => ({
    color: textPrimaryColor,
    marginTop: 4,
    fontWeight: isSelected ? "600" as const : "400" as const,
  }), [isSelected, textPrimaryColor]);

  return (
    <TouchableOpacity
      style={cardStyle}
      onPress={() => onSelect(index)}
      onLongPress={() => onLongPress(index)}
    >
      <View style={thumbnailStyle}>
        <AtomicText
          type="labelSmall"
          style={{ color: onPrimaryColor, fontWeight: "600" }}
        >
          {index + 1}
        </AtomicText>
      </View>
      <AtomicText
        type="labelSmall"
        style={textStyle}
      >
        {scene.duration / 1000}s
      </AtomicText>
    </TouchableOpacity>
  );
});

SceneCard.displayName = 'SceneCard';

export const EditorTimeline: React.FC<EditorTimelineProps> = ({
  project,
  currentSceneIndex,
  onSceneSelect,
  onSceneLongPress,
  onAddScene,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  // Memoize styles that don't change
  const containerStyle = useMemo(() => [
    styles.timeline,
    { backgroundColor: tokens.colors.surface }
  ], [tokens.colors.surface]);

  const headerTextStyle = useMemo(() => ({
    color: tokens.colors.textPrimary,
    fontWeight: "600" as const,
  }), [tokens.colors.textPrimary]);

  return (
    <View style={containerStyle}>
      <View style={styles.timelineHeader}>
        <AtomicText
          type="bodyMedium"
          style={headerTextStyle}
        >
          {t("editor.timeline.title")}
        </AtomicText>
        <TouchableOpacity onPress={onAddScene}>
          <AtomicIcon name="add" size="md" color="primary" />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={project.scenes}
        keyExtractor={(scene) => scene.id}
        renderItem={useCallback(({ item, index }: { item: Scene; index: number }) => (
          <SceneCard
            scene={item}
            index={index}
            isSelected={currentSceneIndex === index}
            onSelect={onSceneSelect}
            onLongPress={onSceneLongPress}
            primaryColor={tokens.colors.primary}
            backgroundColor={tokens.colors.backgroundPrimary}
            borderLightColor={tokens.colors.borderLight}
            surfaceSecondaryColor={tokens.colors.surfaceSecondary}
            onPrimaryColor={tokens.colors.onPrimary}
            textPrimaryColor={tokens.colors.textPrimary}
          />
        ), [currentSceneIndex, onSceneSelect, onSceneLongPress, tokens.colors])}
        showsHorizontalScrollIndicator={false}
        style={styles.scenesScroll}
        // Performance optimizations for horizontal lists
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        initialNumToRender={5}
        windowSize={5}
        // Prevents layout flicker
        getItemLayout={(data, index) => ({
          length: 84, // sceneCard width + marginRight
          offset: 84 * index,
          index,
        })}
        // Maintain scroll position
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timeline: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
  },
  timelineHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  scenesScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  sceneCard: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 12,
    alignItems: "center",
  },
  sceneThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});
