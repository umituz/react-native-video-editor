/**
 * VideoEditor Component
 * Self-contained full-screen video editor.
 * Mirrors PhotoEditor API: accepts videoUri, onClose, onSave.
 */

import React, { useState, useMemo, useRef, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { BottomSheetModal, type BottomSheetModalRef } from "@umituz/react-native-design-system/molecules";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useSafeAreaInsets } from "@umituz/react-native-design-system/safe-area";

import { VideoPlayer } from "./player/presentation/components/VideoPlayer";
import { VideoFilterPicker } from "./presentation/components/VideoFilterPicker";
import { SpeedControlPanel } from "./presentation/components/SpeedControlPanel";
import { DEFAULT_FILTER } from "./infrastructure/constants/filter.constants";
import { DEFAULT_PLAYBACK_RATE } from "./infrastructure/constants/speed.constants";
import type { FilterPreset } from "./domain/entities/video-project.types";

export interface VideoEditorProps {
  videoUri: string;
  onClose: () => void;
  onSave?: (uri: string, filter: FilterPreset, playbackRate: number) => void;
  title?: string;
  t: (key: string) => string;
}

type ActiveTool = "filters" | "speed" | null;

export const VideoEditor: React.FC<VideoEditorProps> = ({
  videoUri,
  onClose,
  onSave,
  title,
  t,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  const [activeFilter, setActiveFilter] = useState<FilterPreset>(DEFAULT_FILTER);
  const [playbackRate, setPlaybackRate] = useState(DEFAULT_PLAYBACK_RATE);
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);

  const filterSheetRef = useRef<BottomSheetModalRef>(null);
  const speedSheetRef = useRef<BottomSheetModalRef>(null);

  const handleToggleTool = useCallback((tool: Exclude<ActiveTool, null>) => {
    if (activeTool === tool) {
      setActiveTool(null);
      if (tool === "filters") filterSheetRef.current?.dismiss();
      else speedSheetRef.current?.dismiss();
    } else {
      setActiveTool(tool);
      if (tool === "filters") filterSheetRef.current?.present();
      else speedSheetRef.current?.present();
    }
  }, [activeTool]);

  const handleSave = useCallback(() => {
    onSave?.(videoUri, activeFilter, playbackRate);
    onClose();
  }, [onSave, onClose, videoUri, activeFilter, playbackRate]);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.backgroundPrimary,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: insets.top + tokens.spacing.sm,
      paddingBottom: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      backgroundColor: tokens.colors.surface,
    },
    headerTitle: {
      flex: 1,
      textAlign: "center",
    },
    headerBtn: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    videoArea: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: tokens.colors.backgroundPrimary,
    },
    toolbar: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.md,
      paddingBottom: insets.bottom + tokens.spacing.md,
      backgroundColor: tokens.colors.surface,
      borderTopWidth: 1,
      borderTopColor: tokens.colors.border,
    },
    toolBtn: {
      alignItems: "center",
      gap: tokens.spacing.xs,
      paddingHorizontal: tokens.spacing.lg,
    },
    toolBtnActive: {
      opacity: 1,
    },
  }), [tokens, insets]);

  const TOOLS: { id: Exclude<ActiveTool, null>; icon: string; labelKey: string }[] = [
    { id: "filters", icon: "sparkles", labelKey: "editor.tools.filters" },
    { id: "speed", icon: "flash", labelKey: "editor.tools.speed" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={onClose}
          accessibilityLabel="Close"
          accessibilityRole="button"
        >
          <AtomicIcon name="close" size="md" color="textPrimary" />
        </TouchableOpacity>

        <AtomicText type="headlineSmall" style={styles.headerTitle}>
          {title || t("editor.video.title") || "Edit Video"}
        </AtomicText>

        <TouchableOpacity
          style={styles.headerBtn}
          onPress={handleSave}
          accessibilityLabel="Save"
          accessibilityRole="button"
        >
          <AtomicText fontWeight="bold" color="primary">
            {t("common.save") || "Save"}
          </AtomicText>
        </TouchableOpacity>
      </View>

      {/* Video Preview */}
      <View style={styles.videoArea}>
        <VideoPlayer
          source={videoUri}
          autoPlay
          loop
          nativeControls={false}
          contentFit="contain"
          playbackRate={playbackRate}
          filterOverlay={activeFilter.id !== "none" ? activeFilter : undefined}
        />
      </View>

      {/* Toolbar */}
      <View style={styles.toolbar}>
        {TOOLS.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <TouchableOpacity
              key={tool.id}
              style={styles.toolBtn}
              onPress={() => handleToggleTool(tool.id)}
              accessibilityLabel={t(tool.labelKey) || tool.id}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <AtomicIcon
                name={tool.icon}
                size="md"
                color={isActive ? "primary" : "textSecondary"}
              />
              <AtomicText
                type="labelSmall"
                color={isActive ? "primary" : "textSecondary"}
              >
                {t(tool.labelKey) || tool.id}
              </AtomicText>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Filter Bottom Sheet */}
      <BottomSheetModal ref={filterSheetRef} snapPoints={["40%"]}>
        <VideoFilterPicker
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          t={t}
        />
      </BottomSheetModal>

      {/* Speed Bottom Sheet */}
      <BottomSheetModal ref={speedSheetRef} snapPoints={["30%"]}>
        <SpeedControlPanel
          playbackRate={playbackRate}
          onChangeRate={setPlaybackRate}
          t={t}
        />
      </BottomSheetModal>
    </View>
  );
};
