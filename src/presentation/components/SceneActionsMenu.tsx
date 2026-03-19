/**
 * Scene Actions Menu Component
 * Single Responsibility: Display scene action menu
 * REFACTORED: Uses generic ActionMenu component (40 lines)
 */

import React, { useMemo, useCallback } from "react";
import { ActionMenu, type ActionMenuItem } from "./generic/ActionMenu";

interface SceneActionsMenuProps {
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
  const menuItems = useMemo<ActionMenuItem[]>(() => {
    const items: ActionMenuItem[] = [
      {
        id: "duplicate",
        label: "Duplicate Scene",
        icon: "copy",
      },
    ];

    if (canDelete) {
      items.push({
        id: "delete",
        label: "Delete Scene",
        icon: "delete",
        destructive: true,
      });
    }

    return items;
  }, [canDelete]);

  const handleSelect = useCallback((actionId: string) => {
    switch (actionId) {
      case "duplicate":
        onDuplicate();
        break;
      case "delete":
        onDelete();
        break;
    }
  }, [onDuplicate, onDelete]);

  return <ActionMenu actions={menuItems} onSelect={handleSelect} testID="scene-actions-menu" />;
};
