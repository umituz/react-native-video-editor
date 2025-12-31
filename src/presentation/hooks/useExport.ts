/**
 * useExport Hook
 * Manages export state and operations
 */

import { useState, useCallback, useEffect } from "react";
import type { ExportSettings, VideoProject } from "@domains/video";
import type { ExportProgress } from "@domains/video/infrastructure/services/video-export.service";
import { exportOrchestratorService } from "../infrastructure/services/export-orchestrator.service";

export interface UseExportReturn {
  isExporting: boolean;
  exportProgress: ExportProgress | null;
  exportVideo: (
    project: VideoProject,
    settings: ExportSettings,
  ) => Promise<{ success: boolean; uri?: string; error?: string }>;
  resetExport: () => void;
}

/**
 * Hook for managing export operations
 */
export function useExport(): UseExportReturn {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<ExportProgress | null>(
    null,
  );

  useEffect(() => {
    exportOrchestratorService.requestNotificationPermissions();
  }, []);

  const exportVideo = useCallback(
    async (
      project: VideoProject,
      settings: ExportSettings,
    ): Promise<{ success: boolean; uri?: string; error?: string }> => {
      setIsExporting(true);
      setExportProgress(null);

      const result = await exportOrchestratorService.exportVideo(
        project,
        settings,
        (progress) => {
          setExportProgress(progress);
        },
      );

      setIsExporting(false);
      return result;
    },
    [],
  );

  const resetExport = useCallback(() => {
    setIsExporting(false);
    setExportProgress(null);
  }, []);

  return {
    isExporting,
    exportProgress,
    exportVideo,
    resetExport,
  };
}
