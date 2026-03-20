/**
 * Layer Actions Menu Component
 * Single Responsibility: Display layer action menu
 * REFACTORED: Now uses generic ActionMenu component (89 lines)
 */

import React, { useMemo, useCallback } from "react";
import { ActionMenu, type ActionMenuItem } from "./generic/ActionMenu";
import { useLocalization } from "@umituz/react-native-settings";
import type { Layer } from "../../domain/entities/video-project.types";

interface LayerActionsMenuProps {
  layer: Layer;
  onEditText: () => void;
  onEditImage: () => void;
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
  onDuplicate,
  onMoveFront,
  onMoveUp,
  onMoveDown,
  onMoveBack,
  onDelete,
}) => {
  const { t } = useLocalization();

  // Build menu items based on layer type
  const menuItems = useMemo<ActionMenuItem[]>(() => {
    const items: ActionMenuItem[] = [];

    // Type-specific actions
    if (layer.type === "text") {
      items.push({
        id: "edit-text",
        label: t("editor.layers.actions.editText") || "Edit Text",
        icon: "create-outline",
      });
    }

    if (layer.type === "image") {
      items.push({
        id: "edit-image",
        label: t("editor.layers.actions.editImage") || "Edit Image",
        icon: "create-outline",
      });
    }

    // Common actions
    items.push(
      {
        id: "duplicate",
        label: t("editor.layers.actions.duplicate") || "Duplicate",
        icon: "copy",
      },
      {
        id: "move-front",
        label: t("editor.layers.actions.moveFront") || "Bring to Front",
        icon: "flip-to-front",
      },
      {
        id: "move-up",
        label: t("editor.layers.actions.moveUp") || "Move Forward",
        icon: "arrow-upward",
      },
      {
        id: "move-down",
        label: t("editor.layers.actions.moveDown") || "Move Backward",
        icon: "arrow-downward",
      },
      {
        id: "move-back",
        label: t("editor.layers.actions.moveBack") || "Send to Back",
        icon: "flip-to-back",
      },
      {
        id: "delete",
        label: t("editor.layers.actions.delete") || "Delete",
        icon: "delete",
        destructive: true,
      },
    );

    return items;
  }, [layer, t]);

  // Handle action selection
  const handleSelect = useCallback((actionId: string) => {
    switch (actionId) {
      case "edit-text":
        onEditText();
        break;
      case "edit-image":
        onEditImage();
        break;
      case "duplicate":
        onDuplicate();
        break;
      case "move-front":
        onMoveFront();
        break;
      case "move-up":
        onMoveUp();
        break;
      case "move-down":
        onMoveDown();
        break;
      case "move-back":
        onMoveBack();
        break;
      case "delete":
        onDelete();
        break;
    }
  }, [onEditText, onEditImage, onDuplicate, onMoveFront, onMoveUp, onMoveDown, onMoveBack, onDelete]);

  return <ActionMenu actions={menuItems} onSelect={handleSelect} testID="layer-actions-menu" />;
};
