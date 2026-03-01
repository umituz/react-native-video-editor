/**
 * Layer Actions Menu Component
 * Single Responsibility: Display layer action menu
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useLocalization } from "@umituz/react-native-settings";
import type { Layer } from "../../domain/entities";

interface LayerActionsMenuProps {
  layer: Layer;
  onEditText: () => void;
  onEditImage: () => void;
  onAnimate: () => void;
  onDuplicate: () => void;
  onMoveFront: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveBack: () => void;
  onDelete: () => void;
}

export const LayerActionsMenu: React.FC<LayerActionsMenuProps> = ({
  layer,
  onEditText,
  onEditImage,
  onAnimate,
  onDuplicate,
  onMoveFront,
  onMoveUp,
  onMoveDown,
  onMoveBack,
  onDelete,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View style={{ paddingVertical: 8 }}>
      {layer.type === "text" && (
        <TouchableOpacity style={styles.actionMenuItem} onPress={onEditText}>
          <AtomicIcon name="create-outline" size="md" color="primary" />
          <AtomicText
            type="bodyMedium"
            style={{
              color: tokens.colors.textPrimary,
              marginLeft: 12,
            }}
          >
            {t("editor.layers.actions.editText")}
          </AtomicText>
        </TouchableOpacity>
      )}
      {layer.type === "image" && (
        <TouchableOpacity style={styles.actionMenuItem} onPress={onEditImage}>
          <AtomicIcon name="create-outline" size="md" color="primary" />
          <AtomicText
            type="bodyMedium"
            style={{
              color: tokens.colors.textPrimary,
              marginLeft: 12,
            }}
          >
            {t("editor.layers.actions.editImage")}
          </AtomicText>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.actionMenuItem} onPress={onAnimate}>
        <AtomicIcon name="sparkles-outline" size="md" color="primary" />
        <AtomicText
          type="bodyMedium"
          style={{
            color: tokens.colors.textPrimary,
            marginLeft: 12,
          }}
        >
          {layer.animation
            ? t("editor.layers.actions.editAnimation")
            : t("editor.layers.actions.addAnimation")}
        </AtomicText>
        {layer.animation && (
          <View
            style={[
              styles.animationBadge,
              { backgroundColor: tokens.colors.success },
            ]}
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionMenuItem} onPress={onDuplicate}>
        <AtomicIcon name="copy" size="md" color="primary" />
        <AtomicText
          type="bodyMedium"
          style={{
            color: tokens.colors.textPrimary,
            marginLeft: 12,
          }}
        >
          {t("editor.layers.actions.duplicate")}
        </AtomicText>
      </TouchableOpacity>

      <View
        style={[styles.divider, { backgroundColor: tokens.colors.border }]}
      />

      <TouchableOpacity style={styles.actionMenuItem} onPress={onMoveFront}>
        <AtomicIcon name="chevron-up-outline" size="md" color="secondary" />
        <AtomicText
          type="bodyMedium"
          style={{
            color: tokens.colors.textSecondary,
            marginLeft: 12,
          }}
        >
          {t("editor.layers.actions.bringToFront")}
        </AtomicText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionMenuItem} onPress={onMoveUp}>
        <AtomicIcon name="chevron-up-outline" size="md" color="secondary" />
        <AtomicText
          type="bodyMedium"
          style={{
            color: tokens.colors.textSecondary,
            marginLeft: 12,
          }}
        >
          {t("editor.layers.actions.moveUp")}
        </AtomicText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionMenuItem} onPress={onMoveDown}>
        <AtomicIcon name="chevron-down" size="md" color="secondary" />
        <AtomicText
          type="bodyMedium"
          style={{
            color: tokens.colors.textSecondary,
            marginLeft: 12,
          }}
        >
          {t("editor.layers.actions.moveDown")}
        </AtomicText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionMenuItem} onPress={onMoveBack}>
        <AtomicIcon name="chevron-down-outline" size="md" color="secondary" />
        <AtomicText
          type="bodyMedium"
          style={{
            color: tokens.colors.textSecondary,
            marginLeft: 12,
          }}
        >
          {t("editor.layers.actions.sendToBack")}
        </AtomicText>
      </TouchableOpacity>

      <View
        style={[styles.divider, { backgroundColor: tokens.colors.border }]}
      />

      <TouchableOpacity style={styles.actionMenuItem} onPress={onDelete}>
        <AtomicIcon name="trash-outline" size="md" color="error" />
        <AtomicText
          type="bodyMedium"
          style={{
            color: tokens.colors.error,
            marginLeft: 12,
          }}
        >
          {t("editor.layers.actions.delete")}
        </AtomicText>
      </TouchableOpacity>
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
  divider: {
    height: 1,
    marginVertical: 8,
  },
  animationBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
});
