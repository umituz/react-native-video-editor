/**
 * useVideoCaching Hook
 * Manages video caching state and download progress
 */

import { useState, useEffect, useCallback } from "react";

import {
  getOrDownloadVideo,
  isVideoCached,
  type VideoCacheResult,
} from "../../infrastructure/services/video-cache.service";

declare const __DEV__: boolean;

/** Video caching state */
export interface VideoCachingState {
  readonly localUri: string | null;
  readonly isDownloading: boolean;
  readonly downloadProgress: number;
  readonly fromCache: boolean;
  readonly error: string | null;
  readonly retry: () => void;
}

/**
 * Hook for managing video caching
 * Downloads remote videos to local cache for playback
 */
export const useVideoCaching = (sourceUrl: string | null): VideoCachingState => {
  const [localUri, setLocalUri] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [fromCache, setFromCache] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVideo = useCallback(async () => {
    if (!sourceUrl) {
      setLocalUri(null);
      setIsDownloading(false);
      setDownloadProgress(0);
      setFromCache(false);
      setError(null);
      return;
    }

    if (sourceUrl.startsWith("file://")) {
      setLocalUri(sourceUrl);
      setIsDownloading(false);
      setDownloadProgress(1);
      setFromCache(true);
      setError(null);
      return;
    }

    const cached = isVideoCached(sourceUrl);
    setIsDownloading(!cached);
    setDownloadProgress(cached ? 1 : 0);
    setError(null);

    try {
      const result: VideoCacheResult = await getOrDownloadVideo(
        sourceUrl,
        (progress) => setDownloadProgress(progress),
      );

      setLocalUri(result.uri);
      setFromCache(result.fromCache);
      setIsDownloading(false);
      setDownloadProgress(1);

      if (__DEV__) {
        console.log("[useVideoCaching] Video ready:", result.uri);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Download failed";
      setError(message);
      setIsDownloading(false);
      setLocalUri(null);

      if (__DEV__) {
        console.log("[useVideoCaching] Error:", message);
      }
    }
  }, [sourceUrl]);

  useEffect(() => {
    loadVideo();
  }, [loadVideo]);

  const retry = useCallback(() => {
    setError(null);
    loadVideo();
  }, [loadVideo]);

  return {
    localUri,
    isDownloading,
    downloadProgress,
    fromCache,
    error,
    retry,
  };
};
