/**
 * SubtitleListHeader Component
 * Header component for subtitle list panel
 */

import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

interface SubtitleListHeaderProps {
  count: number;
  onAdd: () => void;
  title?: string;
}

export const SubtitleListHeader: React.FC<SubtitleListHeaderProps> = ({
  count,
  onAdd,
  title,
}) => {
  const tokens = useAppDesignTokens();

  const styles = {
    header: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
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
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
  };

  return (
    <View style={styles.header}>
      <AtomicText fontWeight="semibold" color="textPrimary">
        {title || "Subtitles"} ({count})
      </AtomicText>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={onAdd}
        accessibilityRole="button"
      >
        <AtomicIcon name="add" size="sm" color="onPrimary" />
      </TouchableOpacity>
    </View>
  );
};
