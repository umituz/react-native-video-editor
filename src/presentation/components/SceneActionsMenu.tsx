/**
 * Scene Actions Menu Component
 * Single Responsibility: Display scene action menu
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface SceneActionsMenuProps {
  sceneIndex: number;
  canDelete: boolean;
  onDuplicate: () => void;
  onDelete: () => void;
}

export const SceneActionsMenu: React.FC<SceneActionsMenuProps> = ({
  sceneIndex: _sceneIndex,
  canDelete,
  onDuplicate,
  onDelete,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={{ paddingVertical: 8 }}>
      <TouchableOpacity style={styles.actionMenuItem} onPress={onDuplicate}>
        <AtomicIcon name="copy" size="md" color="primary" />
        <AtomicText
          type="bodyMedium"
          style={{
            color: tokens.colors.textPrimary,
            marginLeft: 12,
          }}
        >
          Duplicate Scene
        </AtomicText>
      </TouchableOpacity>

      {canDelete && (
        <TouchableOpacity style={styles.actionMenuItem} onPress={onDelete}>
          <AtomicIcon name="trash-outline" size="md" color="error" />
          <AtomicText
            type="bodyMedium"
            style={{
              color: tokens.colors.error,
              marginLeft: 12,
            }}
          >
            Delete Scene
          </AtomicText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  actionMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});
