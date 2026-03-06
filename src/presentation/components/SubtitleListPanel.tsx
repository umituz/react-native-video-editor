/**
 * SubtitleListPanel Component
 * Full subtitle editor panel: list + add/edit modal
 */

import React, { useState, useCallback, useMemo } from "react";
import { View, ScrollView, TouchableOpacity, Modal, TextInput, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { SubtitleTimeInput } from "./SubtitleTimeInput";
import { SubtitleStylePicker } from "./SubtitleStylePicker";
import { DEFAULT_SUBTITLE_STYLE } from "../../infrastructure/constants/subtitle.constants";
import { formatTimeDetailed } from "../../infrastructure/utils/srt.utils";
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
  onDelete,
  onSeek,
  t,
}) => {
  const tokens = useAppDesignTokens();

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Subtitle | null>(null);
  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(3);
  const [style, setStyle] = useState<SubtitleStyle>({ ...DEFAULT_SUBTITLE_STYLE });

  const styles = useMemo(() => StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.border,
    },
    addBtn: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: tokens.colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    emptyBox: {
      alignItems: "center",
      paddingTop: tokens.spacing.xl,
      gap: tokens.spacing.sm,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.borders.radius.md,
      marginHorizontal: tokens.spacing.md,
      marginBottom: tokens.spacing.sm,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      overflow: "hidden",
    },
    itemActive: {
      borderColor: tokens.colors.primary,
      backgroundColor: tokens.colors.primaryContainer,
    },
    itemBar: { width: 4, alignSelf: "stretch", backgroundColor: tokens.colors.surfaceVariant },
    itemBarActive: { backgroundColor: tokens.colors.primary },
    itemContent: { flex: 1, padding: tokens.spacing.sm },
    itemTimeRow: { flexDirection: "row", alignItems: "center", gap: tokens.spacing.xs, marginBottom: 2 },
    itemEditBtn: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    // Modal
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    modal: {
      backgroundColor: tokens.colors.surface,
      borderTopLeftRadius: tokens.borders.radius.xl,
      borderTopRightRadius: tokens.borders.radius.xl,
      paddingHorizontal: tokens.spacing.md,
      paddingTop: tokens.spacing.md,
      paddingBottom: tokens.spacing.xl,
      maxHeight: "90%",
    },
    handle: {
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: tokens.colors.border,
      alignSelf: "center",
      marginBottom: tokens.spacing.md,
    },
    textInput: {
      backgroundColor: tokens.colors.surfaceVariant,
      borderRadius: tokens.borders.radius.md,
      padding: tokens.spacing.md,
      color: tokens.colors.textPrimary,
      fontSize: 16,
      minHeight: 80,
      textAlignVertical: "top",
      marginBottom: tokens.spacing.md,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    timeRow: {
      flexDirection: "row",
      gap: tokens.spacing.md,
      marginBottom: tokens.spacing.md,
    },
    actionRow: {
      flexDirection: "row",
      gap: tokens.spacing.md,
      marginTop: tokens.spacing.md,
    },
    cancelBtn: {
      flex: 1,
      paddingVertical: tokens.spacing.md,
      borderRadius: tokens.borders.radius.md,
      backgroundColor: tokens.colors.surfaceVariant,
      alignItems: "center",
    },
    saveBtn: {
      flex: 1,
      paddingVertical: tokens.spacing.md,
      borderRadius: tokens.borders.radius.md,
      backgroundColor: tokens.colors.primary,
      alignItems: "center",
    },
    saveBtnDisabled: { opacity: 0.4 },
  }), [tokens]);

  const activeId = useMemo(() => {
    return subtitles.find((s) => currentTime >= s.startTime && currentTime <= s.endTime)?.id ?? null;
  }, [subtitles, currentTime]);

  const openAdd = useCallback(() => {
    setEditing(null);
    setText("");
    setStartTime(Math.floor(currentTime));
    setEndTime(Math.floor(currentTime) + 3);
    setStyle({ ...DEFAULT_SUBTITLE_STYLE });
    setShowModal(true);
  }, [currentTime]);

  const openEdit = useCallback((sub: Subtitle) => {
    setEditing(sub);
    setText(sub.text);
    setStartTime(sub.startTime);
    setEndTime(sub.endTime);
    setStyle({ ...sub.style });
    setShowModal(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!text.trim()) return;
    const resolvedEnd = Math.max(endTime, startTime + 0.5);
    if (editing) {
      onUpdate(editing.id, { text: text.trim(), startTime, endTime: resolvedEnd, style });
    } else {
      onAdd(text.trim(), startTime, resolvedEnd, style);
    }
    setShowModal(false);
  }, [text, editing, startTime, endTime, style, onAdd, onUpdate]);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <AtomicText fontWeight="semibold" color="textPrimary">
          {t("subtitle.panel.title") || "Subtitles"} ({subtitles.length})
        </AtomicText>
        <TouchableOpacity style={styles.addBtn} onPress={openAdd} accessibilityRole="button">
          <AtomicIcon name="add" size="sm" color="onPrimary" />
        </TouchableOpacity>
      </View>

      {/* List */}
      <ScrollView contentContainerStyle={{ paddingVertical: tokens.spacing.sm }}>
        {subtitles.length === 0 ? (
          <View style={styles.emptyBox}>
            <AtomicIcon name="video" size="lg" color="textSecondary" />
            <AtomicText color="textSecondary">{t("subtitle.panel.empty") || "No subtitles yet"}</AtomicText>
            <AtomicText type="labelSmall" color="textTertiary">
              {t("subtitle.panel.emptyHint") || "Tap + to add a subtitle"}
            </AtomicText>
          </View>
        ) : (
          subtitles.map((sub) => {
            const isActive = sub.id === activeId;
            return (
              <TouchableOpacity
                key={sub.id}
                style={[styles.item, isActive && styles.itemActive]}
                onPress={() => onSeek(sub.startTime)}
                accessibilityRole="button"
              >
                <View style={[styles.itemBar, isActive && styles.itemBarActive]} />
                <View style={styles.itemContent}>
                  <View style={styles.itemTimeRow}>
                    <AtomicText type="labelSmall" color="textSecondary">
                      {formatTimeDetailed(sub.startTime)}
                    </AtomicText>
                    <AtomicText type="labelSmall" color="textTertiary">→</AtomicText>
                    <AtomicText type="labelSmall" color="textSecondary">
                      {formatTimeDetailed(sub.endTime)}
                    </AtomicText>
                  </View>
                  <AtomicText color="textPrimary" numberOfLines={2}>
                    {sub.text}
                  </AtomicText>
                </View>
                <TouchableOpacity
                  style={styles.itemEditBtn}
                  onPress={() => openEdit(sub)}
                  accessibilityRole="button"
                >
                  <AtomicIcon name="edit" size="sm" color="textSecondary" />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal visible={showModal} animationType="slide" transparent onRequestClose={() => setShowModal(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setShowModal(false)}>
          <TouchableOpacity style={styles.modal} activeOpacity={1} onPress={() => {}}>
            <View style={styles.handle} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <AtomicText fontWeight="bold" color="textPrimary" style={{ marginBottom: tokens.spacing.md, fontSize: 18 }}>
                {editing ? t("subtitle.modal.edit") || "Edit Subtitle" : t("subtitle.modal.add") || "Add Subtitle"}
              </AtomicText>

              <TextInput
                style={styles.textInput}
                value={text}
                onChangeText={setText}
                placeholder={t("subtitle.modal.placeholder") || "Enter subtitle text…"}
                placeholderTextColor={tokens.colors.textSecondary}
                multiline
                numberOfLines={3}
              />

              <View style={styles.timeRow}>
                <SubtitleTimeInput
                  label={t("subtitle.modal.startTime") || "Start"}
                  value={startTime}
                  onChange={setStartTime}
                />
                <SubtitleTimeInput
                  label={t("subtitle.modal.endTime") || "End"}
                  value={endTime}
                  onChange={setEndTime}
                />
              </View>

              <SubtitleStylePicker style={style} previewText={text} onChange={setStyle} t={t} />

              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowModal(false)} accessibilityRole="button">
                  <AtomicText fontWeight="semibold" color="textSecondary">
                    {t("common.cancel") || "Cancel"}
                  </AtomicText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.saveBtn, !text.trim() && styles.saveBtnDisabled]}
                  onPress={handleSave}
                  disabled={!text.trim()}
                  accessibilityRole="button"
                >
                  <AtomicText fontWeight="semibold" color="onPrimary">
                    {t("common.save") || "Save"}
                  </AtomicText>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
