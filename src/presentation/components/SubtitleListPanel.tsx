/**
 * SubtitleListPanel Component
 * Full subtitle editor panel: list + add/edit modal
 * PERFORMANCE: Uses FlatList for efficient rendering of large subtitle lists
 */

import React, { useMemo, useCallback } from "react";
import { View, FlatList } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { SubtitleListHeader } from "./subtitle/SubtitleListHeader";
import { SubtitleListItem } from "./subtitle/SubtitleListItem";
import { SubtitleModal } from "./subtitle/SubtitleModal";
import { useSubtitleForm } from "./subtitle/useSubtitleForm";
import type { Subtitle, SubtitleStyle } from "../../domain/entities/video-project.types";

interface SubtitleListPanelProps {
  subtitles: Subtitle[];
  currentTime: number;
  onAdd: (text: string, startTime: number, endTime: number, style: SubtitleStyle) => void;
  onUpdate: (id: string, patch: Partial<Omit<Subtitle, "id">>) => void;
  onDelete: (id: string) => void;
  onSeek: (time: number) => void;
  t: (key: string) => string;
}

export const SubtitleListPanel: React.FC<SubtitleListPanelProps> = ({
  subtitles,
  currentTime,
  onAdd,
  onUpdate,
  onDelete: _onDelete,
  onSeek,
  t,
}) => {
  const tokens = useAppDesignTokens();

  const form = useSubtitleForm();

  const activeId = useMemo(() => {
    return subtitles.find((s) => currentTime >= s.startTime && currentTime <= s.endTime)?.id ?? null;
  }, [subtitles, currentTime]);

  // Memoize empty styles to prevent recreation
  const emptyStyles = useMemo(() => ({
    emptyBox: {
      alignItems: "center" as const,
      paddingTop: tokens.spacing.xl,
      gap: tokens.spacing.sm,
    },
  }), [tokens.spacing.xl, tokens.spacing.sm]);

  // Stable render item for FlatList - prevents unnecessary re-renders
  const renderItem = useCallback(({ item }: { item: Subtitle }) => (
    <SubtitleListItem
      key={item.id}
      subtitle={item}
      isActive={item.id === activeId}
      onEdit={form.openEdit}
      onSeek={onSeek}
    />
  ), [activeId, form.openEdit, onSeek]);

  // Stable key extractor
  const keyExtractor = useCallback((item: Subtitle) => item.id, []);

  // List empty component - memoized
  const ListEmptyComponent = useMemo(() => (
    <View style={emptyStyles.emptyBox}>
      <AtomicIcon name="video" size="lg" color="textSecondary" />
      <AtomicText color="textSecondary">
        {t("subtitle.panel.empty") || "No subtitles yet"}
      </AtomicText>
      <AtomicText type="labelSmall" color="textTertiary">
        {t("subtitle.panel.emptyHint") || "Tap + to add a subtitle"}
      </AtomicText>
    </View>
  ), [emptyStyles.emptyBox, t]);

  return (
    <View style={{ flex: 1 }}>
      <SubtitleListHeader
        count={subtitles.length}
        onAdd={() => form.openAdd(currentTime)}
        title={t("subtitle.panel.title") || "Subtitles"}
      />

      <FlatList
        data={subtitles}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={{
          paddingVertical: tokens.spacing.sm,
          flexGrow: 1,
        }}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={5}
        // Performance: Prevents layout jumps on Android
        getItemLayout={(data, index) => ({
          length: 80, // Approximate height of each item
          offset: 80 * index,
          index,
        })}
      />

      <SubtitleModal
        visible={form.showModal}
        editing={!!form.editing}
        text={form.text}
        startTime={form.startTime}
        endTime={form.endTime}
        style={form.style}
        onChangeText={form.setText}
        onChangeStartTime={form.setStartTime}
        onChangeEndTime={form.setEndTime}
        onChangeStyle={form.setStyle}
        onSave={() => form.save(onAdd, onUpdate)}
        onCancel={form.close}
      />
    </View>
  );
};
