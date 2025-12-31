/**
 * Export Orchestrator Service
 * Handles export business logic and notifications
 */

import * as Device from "expo-device";
import { Alert } from "react-native";
import { notificationService } from "@umituz/react-native-notifications";
import {
  videoExportService,
  ExportProgress,
} from "@domains/video/infrastructure/services/video-export.service";
import type { ExportSettings, VideoProject } from "@domains/video";

export interface ExportResult {
  success: boolean;
  uri?: string;
  error?: string;
}

export interface ExportOrchestratorService {
  exportVideo: (
    project: VideoProject,
    settings: ExportSettings,
    onProgress: (progress: ExportProgress) => void,
  ) => Promise<ExportResult>;
  requestNotificationPermissions: () => Promise<void>;
}

class ExportOrchestratorServiceImpl implements ExportOrchestratorService {
  async requestNotificationPermissions(): Promise<void> {
    if (Device.isDevice) {
      await notificationService.requestPermissions();
    }
  }

  async exportVideo(
    project: VideoProject,
    settings: ExportSettings,
    onProgress: (progress: ExportProgress) => void,
  ): Promise<ExportResult> {
    const projectToExport: VideoProject = {
      ...project,
      exportSettings: settings,
    };

    try {
      const result = await videoExportService.exportVideo(
        projectToExport,
        onProgress,
      );

      if (result.success) {
        await this.showSuccessNotification(project.title, result.uri);
        this.showSuccessAlert();
        return { success: true, uri: result.uri };
      } else {
        await this.showFailureNotification(project.title, result.error);
        this.showFailureAlert(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      await this.showFailureNotification(
        project.title,
        "An unexpected error occurred",
      );
      this.showFailureAlert("An unexpected error occurred");
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  private async showSuccessNotification(
    projectTitle: string,
    uri?: string,
  ): Promise<void> {
    if (!Device.isDevice) return;

    try {
      await notificationService.notifications.scheduleNotification({
        title: "Export Complete",
        body: `${projectTitle} has been exported successfully!`,
        trigger: { type: "date", date: new Date() },
        data: { uri: uri || "" },
      });
    } catch (error) {
      // Silent failure - notification is optional
    }
  }

  private async showFailureNotification(
    projectTitle: string,
    error?: string,
  ): Promise<void> {
    if (!Device.isDevice) return;

    try {
      await notificationService.notifications.scheduleNotification({
        title: "Export Failed",
        body: `Failed to export ${projectTitle}: ${error || "Unknown error"}`,
        trigger: { type: "date", date: new Date() },
      });
    } catch (error) {
      // Silent failure - notification is optional
    }
  }

  private showSuccessAlert(): void {
    Alert.alert(
      "Export Complete",
      "Your video has been exported successfully!",
    );
  }

  private showFailureAlert(error?: string): void {
    Alert.alert("Export Failed", error || "An error occurred during export");
  }
}

export const exportOrchestratorService = new ExportOrchestratorServiceImpl();
