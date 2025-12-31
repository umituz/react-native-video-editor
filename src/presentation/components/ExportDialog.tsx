/**
 * ExportDialog Component
 * Main component for video export dialog
 */

import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useLocalization } from "@umituz/react-native-localization";
import type { ExportSettings, VideoProject } from "@domains/video";
import { useExportForm } from "../../hooks/useExportForm";
import { useExport } from "../../hooks/useExport";
import {
  RESOLUTIONS,
  QUALITIES,
  FORMATS,
} from "../../constants/export.constants";
import {
  ProjectInfoBox,
  OptionSelectorRow,
  WatermarkToggle,
  ExportProgress,
  ExportInfoBanner,
  ExportActions,
} from "./export";

interface ExportDialogProps {
  project: VideoProject;
  onExport: (settings: ExportSettings, uri?: string) => void;
  onCancel: () => void;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({
  project,
  onExport,
  onCancel,
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

  const { isExporting, exportProgress, exportVideo, resetExport } = useExport();

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
