/**
 * useExportForm Hook
 * Manages form state for export dialog
 */

import { useState, useCallback, useMemo } from "react";
import type { ExportSettings, VideoProject } from "@domains/video";
import type {
  Resolution,
  Quality,
  Format,
} from "../constants/export.constants";
import {
  BASE_SIZE_PER_SECOND,
  RESOLUTION_MULTIPLIERS,
  QUALITY_MULTIPLIERS,
} from "../constants/export.constants";

export interface ExportFormState {
  resolution: Resolution;
  quality: Quality;
  format: Format;
  includeWatermark: boolean;
}

export interface UseExportFormReturn {
  formState: ExportFormState;
  setResolution: (resolution: Resolution) => void;
  setQuality: (quality: Quality) => void;
  setFormat: (format: Format) => void;
  setIncludeWatermark: (include: boolean) => void;
  buildExportSettings: () => ExportSettings;
  estimatedSize: string;
  projectDuration: number;
}

/**
 * Hook for managing export form state
 */
export function useExportForm(project: VideoProject): UseExportFormReturn {
  const [formState, setFormState] = useState<ExportFormState>({
    resolution: "1080p",
    quality: "high",
    format: "mp4",
    includeWatermark: false,
  });

  const projectDuration = useMemo(() => {
    return (
      project.scenes.reduce((acc, scene) => acc + scene.duration, 0) / 1000
    );
  }, [project.scenes]);

  const estimatedSize = useMemo(() => {
    const baseSize = projectDuration * BASE_SIZE_PER_SECOND;
    const resolutionMultiplier = RESOLUTION_MULTIPLIERS[formState.resolution];
    const qualityMultiplier = QUALITY_MULTIPLIERS[formState.quality];
    return (baseSize * resolutionMultiplier * qualityMultiplier).toFixed(1);
  }, [projectDuration, formState.resolution, formState.quality]);

  const setResolution = useCallback((resolution: Resolution) => {
    setFormState((prev) => ({ ...prev, resolution }));
  }, []);

  const setQuality = useCallback((quality: Quality) => {
    setFormState((prev) => ({ ...prev, quality }));
  }, []);

  const setFormat = useCallback((format: Format) => {
    setFormState((prev) => ({ ...prev, format }));
  }, []);

  const setIncludeWatermark = useCallback((include: boolean) => {
    setFormState((prev) => ({ ...prev, includeWatermark: include }));
  }, []);

  const buildExportSettings = useCallback((): ExportSettings => {
    return {
      resolution: formState.resolution,
      quality: formState.quality,
      format: formState.format,
      includeWatermark: formState.includeWatermark,
    };
  }, [formState]);

  return {
    formState,
    setResolution,
    setQuality,
    setFormat,
    setIncludeWatermark,
    buildExportSettings,
    estimatedSize,
    projectDuration,
  };
}
