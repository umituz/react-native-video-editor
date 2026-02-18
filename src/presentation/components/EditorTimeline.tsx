/**
 * Editor Timeline Component
 * Single Responsibility: Display scene timeline
 */

import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-settings";
import type { VideoProject, Scene } from "../../domain/entities";

interface EditorTimelineProps {
  project: VideoProject;
  currentSceneIndex: number;
  onSceneSelect: (index: number) => void;
  onSceneLongPress: (index: number) => void;
  onAddScene: () => void;
}

export const EditorTimeline: React.FC<EditorTimelineProps> = ({
  project,
  currentSceneIndex,
  onSceneSelect,
  onSceneLongPress,
  onAddScene,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  return (
    <View style={[styles.timeline, { backgroundColor: tokens.colors.surface }]}>
      <View style={styles.timelineHeader}>
        <AtomicText
          type="bodyMedium"
          style={{ color: tokens.colors.textPrimary, fontWeight: "600" }}
        >
          {t("editor.timeline.title")}
        </AtomicText>
        <TouchableOpacity onPress={onAddScene}>
          <AtomicIcon name="add" size="md" color="primary" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scenesScroll}
      >
        {project.scenes.map((scene: Scene, index: number) => (
          <TouchableOpacity
            key={scene.id}
            style={[
              styles.sceneCard,
              {
                backgroundColor:
                  currentSceneIndex === index
                    ? tokens.colors.primary + "20"
                    : tokens.colors.backgroundPrimary,
                borderColor:
                  currentSceneIndex === index
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
              },
            ]}
            onPress={() => onSceneSelect(index)}
            onLongPress={() => onSceneLongPress(index)}
          >
            <View
              style={[
                styles.sceneThumbnail,
                {
                  backgroundColor:
                    scene.background.value || tokens.colors.surfaceSecondary,
                },
              ]}
            >
              <AtomicText
                type="labelSmall"
                style={{ color: tokens.colors.onPrimary, fontWeight: "600" }}
              >
                {index + 1}
              </AtomicText>
            </View>
            <AtomicText
              type="labelSmall"
              style={{
                color: tokens.colors.textPrimary,
                marginTop: 4,
                fontWeight: currentSceneIndex === index ? "600" : "400",
              }}
            >
              {scene.duration / 1000}s
            </AtomicText>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
