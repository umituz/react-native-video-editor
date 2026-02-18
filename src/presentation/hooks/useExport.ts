/**
 * useExport Hook
 * Manages export state and operations
 * Package-driven: Export function is injected from app
 */

import { useState, useCallback } from "react";
import type { ExportSettings, VideoProject } from "../../domain/entities";

export interface ExportProgress {
  status: "preparing" | "encoding" | "saving" | "complete" | "error";
  phase: string;
  progress: number;
  message?: string;
  currentFrame?: number;
  totalFrames?: number;
}

export interface ExportResult {
  success: boolean;
  uri?: string;
  error?: string;
}

export interface UseExportConfig {
  exportFunction: (
    project: VideoProject,
    settings: ExportSettings,
    onProgress: (progress: ExportProgress) => void,
  ) => Promise<ExportResult>;
}

interface UseExportReturn {
  isExporting: boolean;
  exportProgress: ExportProgress | null;
  exportVideo: (
    project: VideoProject,
    settings: ExportSettings,
  ) => Promise<ExportResult>;
  resetExport: () => void;
}

/**
 * Hook for managing export operations
 * @param config - Configuration with export function injected from app
 */
export function useExport(config: UseExportConfig): UseExportReturn {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<ExportProgress | null>(
    null,
  );

  const exportVideo = useCallback(
    async (
      project: VideoProject,
      settings: ExportSettings,
    ): Promise<ExportResult> => {
      setIsExporting(true);
      setExportProgress(null);

      const result = await config.exportFunction(project, settings, (progress) => {
        setExportProgress(progress);
      });

      setIsExporting(false);
      return result;
    },
    [config],
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
