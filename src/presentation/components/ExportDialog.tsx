/**
 * ExportDialog Component
 * Main component for video export dialog
 */

import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { useLocalization } from "@umituz/react-native-settings";
import type { ExportSettings, VideoProject } from "../../domain/entities";
import { useExportForm } from "../hooks/useExportForm";
import { useExport, type UseExportConfig, type ExportResult } from "../hooks/useExport";
import {
  RESOLUTIONS,
  QUALITIES,
  FORMATS,
} from "../../infrastructure/constants/export.constants";
import {
  ProjectInfoBox,
  OptionSelectorRow,
  WatermarkToggle,
  ExportProgress,
  ExportInfoBanner,
  ExportActions,
} from "./export";

interface ExportDialogProps {
  readonly project: VideoProject;
  readonly onExport: (settings: ExportSettings, uri?: string) => void;
  readonly onCancel: () => void;
  readonly exportConfig?: UseExportConfig;
}

const defaultExportFunction = async (): Promise<ExportResult> => {
  Alert.alert("Not Configured", "Export function not provided.");
  return { success: false, error: "Export function not configured" };
};

export const ExportDialog: React.FC<ExportDialogProps> = ({
  project,
  onExport,
  onCancel,
  exportConfig,
}) => {
  const { t } = useLocalization();
  const {
    formState,
    setResolution,
    setQuality,
    setFormat,
    setIncludeWatermark,
    buildExportSettings,
    estimatedSize,
    projectDuration,
  } = useExportForm(project);

  const config: UseExportConfig = exportConfig ?? {
    exportFunction: defaultExportFunction,
  };

  const { isExporting, exportProgress, exportVideo, resetExport } = useExport(config);

  const handleExport = useCallback(async () => {
    const settings = buildExportSettings();
    const result = await exportVideo(project, settings);

    if (result.success) {
      onExport(settings, result.uri);
    } else {
      resetExport();
    }
  }, [project, buildExportSettings, exportVideo, onExport, resetExport]);

  const resolutionOptions = RESOLUTIONS.map((res) => ({
    value: res,
    label: res,
    textTransform: "none" as const,
  }));

  const qualityOptions = QUALITIES.map((qual) => ({
    value: qual,
    label: qual,
    textTransform: "capitalize" as const,
  }));

  const formatOptions = FORMATS.map((fmt) => ({
    value: fmt,
    label: fmt,
    textTransform: "uppercase" as const,
  }));

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProjectInfoBox
          project={project}
          duration={projectDuration}
          estimatedSize={estimatedSize}
        />

        <OptionSelectorRow
          title={t("editor.export.resolution")}
          options={resolutionOptions}
          selectedValue={formState.resolution}
          onValueChange={setResolution}
        />

        <OptionSelectorRow
          title={t("editor.export.quality")}
          options={qualityOptions}
          selectedValue={formState.quality}
          onValueChange={setQuality}
        />

        <OptionSelectorRow
          title={t("editor.export.format")}
          options={formatOptions}
          selectedValue={formState.format}
          onValueChange={setFormat}
        />

        <WatermarkToggle
          includeWatermark={formState.includeWatermark}
          onToggle={setIncludeWatermark}
        />

        {isExporting && exportProgress && (
          <ExportProgress progress={exportProgress} />
        )}

        {!isExporting && <ExportInfoBanner />}
      </ScrollView>

      <ExportActions
        isExporting={isExporting}
        onCancel={onCancel}
        onExport={handleExport}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});
