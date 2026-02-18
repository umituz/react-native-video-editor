/**
 * Video Cache Service
 * Downloads and caches remote videos for playback
 * Bypasses CDN Range request issues by downloading entire file first
 */

import {
  downloadFileWithProgress,
  getCachedFileUri,
  isUrlCached,
  deleteCachedFile,
  getCacheDirectory,
  clearCache,
  type DownloadProgressCallback,
  type DownloadProgress,
} from "@umituz/react-native-design-system";

declare const __DEV__: boolean;

const VIDEO_CACHE_SUBDIR = "video-cache";

/** Cache result type */
export interface VideoCacheResult {
  readonly uri: string;
  readonly fromCache: boolean;
}

/** Re-export progress callback type */
export type VideoDownloadProgressCallback = (progress: number) => void;

/**
 * Get video cache directory path
 */
const getVideoCacheDir = (): string => {
  const cacheDir = getCacheDirectory();
  return `${cacheDir}${VIDEO_CACHE_SUBDIR}/`;
};

/**
 * Check if video is already cached
 */
export const isVideoCached = (url: string): boolean => {
  if (!url || url.startsWith("file://")) return false;
  return isUrlCached(url, getVideoCacheDir());
};

/**
 * Get cached video URI if exists
 */
export const getCachedVideoUri = (url: string): string | null => {
  if (!url) return null;
  if (url.startsWith("file://")) return url;
  return getCachedFileUri(url, getVideoCacheDir());
};

/**
 * Download video to cache with progress tracking
 */
export const downloadVideo = async (
  url: string,
  onProgress?: VideoDownloadProgressCallback,
): Promise<string> => {
  if (!url) throw new Error("URL is required");
  if (url.startsWith("file://")) return url;

  if (__DEV__) {
    console.log("[VideoCache] Downloading:", url);
  }

  const progressCallback: DownloadProgressCallback | undefined = onProgress
    ? (progress: DownloadProgress) => {
        const percent = progress.totalBytesExpectedToWrite > 0
          ? progress.totalBytesWritten / progress.totalBytesExpectedToWrite
          : 0;
        onProgress(percent);
      }
    : undefined;

  const result = await downloadFileWithProgress(
    url,
    getVideoCacheDir(),
    progressCallback,
  );

  if (!result.success || !result.uri) {
    throw new Error(result.error || "Download failed");
  }

  if (__DEV__) {
    console.log("[VideoCache] Download complete:", result.uri);
  }

  return result.uri;
};

/**
 * Get video from cache or download if not cached
 */
export const getOrDownloadVideo = async (
  url: string,
  onProgress?: VideoDownloadProgressCallback,
): Promise<VideoCacheResult> => {
  if (!url) throw new Error("URL is required");

  if (url.startsWith("file://")) {
    return { uri: url, fromCache: true };
  }

  // Check cache first
  const cachedUri = getCachedVideoUri(url);
  if (cachedUri) {
    if (__DEV__) {
      console.log("[VideoCache] Using cached video:", cachedUri);
    }
    return { uri: cachedUri, fromCache: true };
  }

  // Download if not cached
  const downloadedUri = await downloadVideo(url, onProgress);
  return { uri: downloadedUri, fromCache: false };
};

/**
 * Clear all cached videos
 */
export const clearVideoCache = async (): Promise<void> => {
  await clearCache();
};

/**
 * Delete a specific cached video
 */
export const deleteSpecificCachedVideo = async (url: string): Promise<boolean> => {
  if (!url || url.startsWith("file://")) return false;
  return deleteCachedFile(url, getVideoCacheDir());
};
