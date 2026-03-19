/**
 * SubtitleListItem Component
 * Individual subtitle item in the list
 */

import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { formatTimeDetailed } from "../../../infrastructure/utils/srt.utils";
import type { Subtitle } from "../../../domain/entities/video-project.types";

interface SubtitleListItemProps {
  subtitle: Subtitle;
  isActive: boolean;
  onEdit: (subtitle: Subtitle) => void;
  onSeek: (time: number) => void;
}

export const SubtitleListItem: React.FC<SubtitleListItemProps> = ({
  subtitle,
  isActive,
  onEdit,
  onSeek,
}) => {
  const tokens = useAppDesignTokens();

  const styles = {
    item: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      borderRadius: tokens.borders.radius.md,
      marginHorizontal: tokens.spacing.md,
      marginBottom: tokens.spacing.sm,
      borderWidth: 1,
      borderColor: isActive ? tokens.colors.primary : tokens.colors.border,
      backgroundColor: isActive ? tokens.colors.primaryContainer : tokens.colors.surface,
      overflow: "hidden" as const,
    },
    itemBar: {
      width: 4,
      alignSelf: "stretch" as const,
      backgroundColor: isActive ? tokens.colors.primary : tokens.colors.surfaceVariant,
    },
    itemContent: {
      flex: 1,
      padding: tokens.spacing.sm,
    },
    itemTimeRow: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: tokens.spacing.xs,
      marginBottom: 2,
    },
    itemEditBtn: {
      width: 40,
      height: 40,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemBar} />
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() => onSeek(subtitle.startTime)}
        activeOpacity={0.7}
      >
        <View style={styles.itemTimeRow}>
          <AtomicText color="textSecondary">
            {formatTimeDetailed(subtitle.startTime)}
          </AtomicText>
          <AtomicText color="textSecondary">
            →
          </AtomicText>
          <AtomicText color="textSecondary">
            {formatTimeDetailed(subtitle.endTime)}
          </AtomicText>
        </View>
        <AtomicText color="textPrimary" numberOfLines={2}>
          {subtitle.text}
        </AtomicText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemEditBtn}
        onPress={() => onEdit(subtitle)}
        accessibilityRole="button"
        accessibilityLabel="Edit subtitle"
      >
        <AtomicIcon name="edit" size="sm" color="textSecondary" />
      </TouchableOpacity>
    </View>
  );
};
