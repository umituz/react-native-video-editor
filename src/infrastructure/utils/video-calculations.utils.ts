/**
 * Video Calculation Utilities
 * Centralized video-related calculations for export and file size estimation
 */

import type { Scene, VideoProject } from "../../domain/entities/video-project.types";
import {
  RESOLUTION_MULTIPLIERS,
  QUALITY_MULTIPLIERS,
  BASE_SIZE_PER_SECOND,
} from "../constants/export.constants";

/**
 * Calculate estimated file size for video export
 */
export function calculateEstimatedFileSize(
  durationSeconds: number,
  resolution: string,
  quality: string,
): number {
  const baseSize = durationSeconds * BASE_SIZE_PER_SECOND;
  const resolutionMultiplier = RESOLUTION_MULTIPLIERS[resolution as keyof typeof RESOLUTION_MULTIPLIERS] || 1.0;
  const qualityMultiplier = QUALITY_MULTIPLIERS[quality as keyof typeof QUALITY_MULTIPLIERS] || 1.0;

  return baseSize * resolutionMultiplier * qualityMultiplier;
}

/**
 * Calculate estimated file size and return formatted string
 */
export function formatEstimatedFileSize(
  durationSeconds: number,
  resolution: string,
  quality: string,
  decimals: number = 1,
): string {
  const sizeInMB = calculateEstimatedFileSize(durationSeconds, resolution, quality);
  return sizeInMB.toFixed(decimals);
}

/**
 * Calculate total project duration from scenes (in seconds)
 */
export function calculateProjectDuration(scenes: Scene[]): number {
  return scenes.reduce((total, scene) => total + scene.duration, 0) / 1000;
}

/**
 * Calculate total project duration from VideoProject (in seconds)
 */
export function calculateVideoProjectDuration(project: VideoProject): number {
  return calculateProjectDuration(project.scenes);
}

/**
 * Calculate aspect ratio as decimal
 */
export function getAspectRatioValue(aspectRatio: string): number {
  const ratioMap: Record<string, number> = {
    "16:9": 16 / 9,
    "9:16": 9 / 16,
    "1:1": 1,
    "4:5": 4 / 5,
  };

  return ratioMap[aspectRatio] || 16 / 9;
}

/**
 * Calculate height from width and aspect ratio
 */
export function calculateHeightFromAspectRatio(
  width: number,
  aspectRatio: string,
): number {
  const ratio = getAspectRatioValue(aspectRatio);
  return width / ratio;
}

/**
 * Calculate width from height and aspect ratio
 */
export function calculateWidthFromAspectRatio(
  height: number,
  aspectRatio: string,
): number {
  const ratio = getAspectRatioValue(aspectRatio);
  return height * ratio;
}

/**
 * Calculate resolution dimensions
 */
export interface ResolutionDimensions {
  width: number;
  height: number;
}

export function calculateResolutionDimensions(
  resolution: string,
  aspectRatio: string,
): ResolutionDimensions {
  const baseHeights: Record<string, number> = {
    "720p": 720,
    "1080p": 1080,
    "4k": 2160,
  };

  const height = baseHeights[resolution] || 1080;
  const width = calculateWidthFromAspectRatio(height, aspectRatio);

  return { width, height };
}

/**
 * Calculate bitrate based on resolution and quality (in kbps)
 */
export function calculateBitrate(
  resolution: string,
  quality: string,
): number {
  const baseBitrates: Record<string, number> = {
    "720p": 5000,
    "1080p": 10000,
    "4k": 40000,
  };

  const qualityMultipliers: Record<string, number> = {
    low: 0.6,
    medium: 1.0,
    high: 1.5,
  };

  const baseBitrate = baseBitrates[resolution] || 10000;
  const qualityMultiplier = qualityMultipliers[quality] || 1.0;

  return Math.round(baseBitrate * qualityMultiplier);
}

/**
 * Estimate file size based on bitrate and duration (in MB)
 */
export function estimateFileSizeFromBitrate(
  bitrateKbps: number,
  durationSeconds: number,
): number {
  // Formula: (bitrate in kbps * duration) / 8 = kilobytes
  // Then divide by 1024 to get MB
  const kilobytes = (bitrateKbps * durationSeconds) / 8;
  return kilobytes / 1024;
}
