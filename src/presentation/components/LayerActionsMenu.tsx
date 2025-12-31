/**
 * Layer Actions Menu Component
 * Single Responsibility: Display layer action menu
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { Layer, ImageLayer } from "../../../domain/entities";

export interface LayerActionsMenuProps {
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

  return (
    <View style={{ paddingVertical: 8 }}>
      {layer.type === "text" && (
        <TouchableOpacity style={styles.actionMenuItem} onPress={onEditText}>
          <AtomicIcon name="Edit" size="md" color="primary" />
          <AtomicText
            type="bodyMedium"
            style={{
              color: tokens.colors.textPrimary,
              marginLeft: 12,
            }}
          >
            Edit Text
          </AtomicText>
        </TouchableOpacity>
      )}
      {layer.type === "image" && (
        <TouchableOpacity style={styles.actionMenuItem} onPress={onEditImage}>
          <AtomicIcon name="Edit" size="md" color="primary" />
          <AtomicText
            type="bodyMedium"
            style={{
              color: tokens.colors.textPrimary,
              marginLeft: 12,
            }}
          >
            Edit Image
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
          {layer.animation ? "Edit Animation" : "Add Animation"}
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
          Duplicate Layer
        </AtomicText>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.actionMenuItem} onPress={onMoveFront}>
        <AtomicIcon name="ChevronsUp" size="md" color="secondary" />
        <AtomicText
          type="bodyMedium"
          style={{
            color: tokens.colors.textSecondary,
            marginLeft: 12,
          }}
        >
          Bring to Front
        </AtomicText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionMenuItem} onPress={onMoveUp}>
        <AtomicIcon name="ChevronUp" size="md" color="secondary" />
        <AtomicText
          type="bodyMedium"
          style={{
            color: tokens.colors.textSecondary,
            marginLeft: 12,
          }}
        >
          Move Up
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
          Move Down
        </AtomicText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionMenuItem} onPress={onMoveBack}>
        <AtomicIcon name="ChevronsDown" size="md" color="secondary" />
        <AtomicText
          type="bodyMedium"
          style={{
            color: tokens.colors.textSecondary,
            marginLeft: 12,
          }}
        >
          Send to Back
        </AtomicText>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.actionMenuItem} onPress={onDelete}>
        <AtomicIcon name="trash-outline" size="md" color="error" />
        <AtomicText
          type="bodyMedium"
          style={{
            color: tokens.colors.error,
            marginLeft: 12,
          }}
        >
          Delete Layer
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
    backgroundColor: "#E5E7EB",
    marginVertical: 8,
  },
  animationBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
});
