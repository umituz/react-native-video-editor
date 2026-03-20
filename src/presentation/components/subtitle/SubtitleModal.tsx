/**
 * SubtitleModal Component
 * Modal for adding/editing subtitles
 */

import React from "react";
import { View, Modal, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { SubtitleTimeInput } from "../SubtitleTimeInput";
import { SubtitleStylePicker } from "../SubtitleStylePicker";
import type { SubtitleStyle } from "../../../domain/entities/video-project.types";

interface SubtitleModalProps {
  visible: boolean;
  editing: boolean;
  text: string;
  startTime: number;
  endTime: number;
  style: SubtitleStyle;
  onChangeText: (text: string) => void;
  onChangeStartTime: (time: number) => void;
  onChangeEndTime: (time: number) => void;
  onChangeStyle: (style: SubtitleStyle) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const SubtitleModal: React.FC<SubtitleModalProps> = ({
  visible,
  editing,
  text,
  startTime,
  endTime,
  style,
  onChangeText,
  onChangeStartTime,
  onChangeEndTime,
  onChangeStyle,
  onSave,
  onCancel,
}) => {
  const tokens = useAppDesignTokens();

  const styles = {
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end" as const,
    },
    modal: {
      backgroundColor: tokens.colors.surface,
      borderTopLeftRadius: tokens.borders.radius.xl,
      borderTopRightRadius: tokens.borders.radius.xl,
      paddingHorizontal: tokens.spacing.md,
      paddingTop: tokens.spacing.md,
      paddingBottom: tokens.spacing.xl,
    },
    handle: {
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: tokens.colors.border,
      alignSelf: "center" as const,
      marginBottom: tokens.spacing.md,
    },
    textInput: {
      backgroundColor: tokens.colors.surfaceVariant,
      borderRadius: tokens.borders.radius.md,
      padding: tokens.spacing.md,
      color: tokens.colors.textPrimary,
      fontSize: 16,
      minHeight: 80,
      textAlignVertical: "top" as const,
      marginBottom: tokens.spacing.md,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    timeRow: {
      flexDirection: "row" as const,
      gap: tokens.spacing.md,
      marginBottom: tokens.spacing.md,
    },
    actionRow: {
      flexDirection: "row" as const,
      gap: tokens.spacing.md,
      marginTop: tokens.spacing.md,
    },
    cancelBtn: {
      flex: 1,
      paddingVertical: tokens.spacing.md,
      borderRadius: tokens.borders.radius.md,
      backgroundColor: tokens.colors.surfaceVariant,
      alignItems: "center" as const,
    },
    saveBtn: {
      flex: 1,
      paddingVertical: tokens.spacing.md,
      borderRadius: tokens.borders.radius.md,
      backgroundColor: tokens.colors.primary,
      alignItems: "center" as const,
    },
    saveBtnDisabled: { opacity: 0.4 },
  };

  const isValid = text.trim().length > 0 && endTime > startTime;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.handle} />

          <ScrollView>
            <TextInput
              style={styles.textInput}
              placeholder="Enter subtitle text..."
              placeholderTextColor={tokens.colors.textSecondary}
              value={text}
              onChangeText={onChangeText}
              multiline
              autoFocus
            />

            <View style={styles.timeRow}>
              <SubtitleTimeInput
                label="Start"
                value={startTime}
                onChange={onChangeStartTime}
              />
              <SubtitleTimeInput
                label="End"
                value={endTime}
                onChange={onChangeEndTime}
              />
            </View>

            <SubtitleStylePicker style={style} previewText={text} onChange={onChangeStyle} t={(key) => key} />

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                <AtomicText fontWeight="medium" color="textPrimary">
                  Cancel
                </AtomicText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveBtn, !isValid && styles.saveBtnDisabled]}
                onPress={onSave}
                disabled={!isValid}
              >
                <AtomicText fontWeight="semibold" color="onPrimary">
                  {editing ? "Update" : "Add"}
                </AtomicText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
