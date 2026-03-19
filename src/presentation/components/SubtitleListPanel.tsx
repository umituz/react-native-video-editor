/**
 * SubtitleListPanel Component
 * Full subtitle editor panel: list + add/edit modal
 */

import React, { useMemo } from "react";
import { View, ScrollView } from "react-native";
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

  const emptyStyles = {
    emptyBox: {
      alignItems: "center" as const,
      paddingTop: tokens.spacing.xl,
      gap: tokens.spacing.sm,
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <SubtitleListHeader
        count={subtitles.length}
        onAdd={() => form.openAdd(currentTime)}
        title={t("subtitle.panel.title") || "Subtitles"}
      />

      <ScrollView contentContainerStyle={{ paddingVertical: tokens.spacing.sm }}>
        {subtitles.length === 0 ? (
          <View style={emptyStyles.emptyBox}>
            <AtomicIcon name="video" size="lg" color="textSecondary" />
            <AtomicText color="textSecondary">
              {t("subtitle.panel.empty") || "No subtitles yet"}
            </AtomicText>
            <AtomicText type="labelSmall" color="textTertiary">
              {t("subtitle.panel.emptyHint") || "Tap + to add a subtitle"}
            </AtomicText>
          </View>
        ) : (
          subtitles.map((subtitle) => (
            <SubtitleListItem
              key={subtitle.id}
              subtitle={subtitle}
              isActive={subtitle.id === activeId}
              onEdit={form.openEdit}
              onSeek={onSeek}
            />
          ))
        )}
      </ScrollView>

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
