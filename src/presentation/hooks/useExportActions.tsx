/**
 * useExportActions Hook
 * Single Responsibility: Export action handlers
 */

import { useCallback } from "react";
import { ExportDialog } from "../components/ExportDialog";
import type { VideoProject, ExportSettings } from "../../domain/entities";
import type { UseEditorBottomSheetReturn } from "./useEditorBottomSheet";

interface UseExportActionsParams {
  project: VideoProject | undefined;
  bottomSheet: UseEditorBottomSheetReturn;
  onExportComplete: (settings: ExportSettings, uri?: string) => void;
}

interface UseExportActionsReturn {
  handleExport: () => void;
  handleSave: () => void;
}

export function useExportActions({
  project,
  bottomSheet,
  onExportComplete,
}: UseExportActionsParams): UseExportActionsReturn {
  const { openBottomSheet, closeBottomSheet } = bottomSheet;

  const handleExport = useCallback(() => {
    if (!project) return;
    openBottomSheet({
      title: "Export Video",
      children: (
        <ExportDialog
          project={project}
          onExport={onExportComplete}
          onCancel={closeBottomSheet}
        />
      ),
    });
  }, [project, onExportComplete, openBottomSheet, closeBottomSheet]);

  const handleSave = useCallback(() => {
    // Project is automatically saved via updateProject calls
  }, []);

  return {
    handleExport,
    handleSave,
  };
}
