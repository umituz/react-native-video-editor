/**
 * VideoPlayer Component
 * Reusable video player with caching, thumbnail and controls
 */

import React, { useState, useCallback, useMemo } from "react";
import { View, TouchableOpacity, StyleSheet, type ViewStyle } from "react-native";
import { Image } from "expo-image";
import { VideoView } from "expo-video";
import { AtomicIcon, AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useResponsive } from "@umituz/react-native-design-system/responsive";

import type { VideoPlayerProps } from "../../types";
import { useVideoPlayerControl } from "../hooks/useVideoPlayerControl";
import { useVideoCaching } from "../hooks/useVideoCaching";

declare const __DEV__: boolean;

const ASPECT_RATIO = 16 / 9;

/** Extract numeric width from style prop */
const getWidthFromStyle = (style: ViewStyle | undefined): number | null => {
  if (!style) return null;
  const w = style.width;
  if (typeof w === "number") return w;
  return null;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  source,
  thumbnailUrl,
  loop = true,
  muted = false,
  autoPlay = false,
  nativeControls = true,
  contentFit = "cover",
  style,
}) => {
  // IMPORTANT: Call useResponsive BEFORE useAppDesignTokens to maintain hook order
  const { width: screenWidth, horizontalPadding } = useResponsive();
  const tokens = useAppDesignTokens();
  const [userTriggeredPlay, setUserTriggeredPlay] = useState(false);
  const showVideo = autoPlay || userTriggeredPlay;

  // Cache the video first (downloads if needed)
  const { localUri, isDownloading, downloadProgress, error } = useVideoCaching(source);

  // Use cached local URI for player
  const { player, state, controls } = useVideoPlayerControl({
    source: localUri,
    loop,
    muted,
    autoPlay,
  });

  const handlePlay = useCallback(() => {
    if (__DEV__) {
      console.log("[VideoPlayer] handlePlay, localUri:", localUri);
    }
    setUserTriggeredPlay(true);
    controls.play();
  }, [localUri, controls]);

  // Calculate dimensions
  const videoWidth = getWidthFromStyle(style as ViewStyle) ?? (screenWidth - horizontalPadding * 2);
  const videoHeight = videoWidth / ASPECT_RATIO;

  const containerStyle = useMemo(() => ({
    width: videoWidth,
    height: videoHeight,
    backgroundColor: tokens.colors.surface,
    borderRadius: 16,
    overflow: "hidden" as const,
  }), [tokens.colors.surface, videoWidth, videoHeight]);

  const styles = useMemo(() => StyleSheet.create({
    video: { width: videoWidth, height: videoHeight },
    thumbnailContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    thumbnail: { width: videoWidth, height: videoHeight },
    placeholder: { width: videoWidth, height: videoHeight, backgroundColor: tokens.colors.surfaceSecondary },
    playButtonContainer: { ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center" },
    playButton: {
      width: 64, height: 64, borderRadius: 32,
      backgroundColor: tokens.colors.primary,
      justifyContent: "center", alignItems: "center", paddingLeft: 4,
    },
    progressContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center", alignItems: "center",
    },
    progressText: { color: tokens.colors.onPrimary, fontSize: 16, fontWeight: "600" },
    errorText: { color: tokens.colors.error, fontSize: 14, textAlign: "center", padding: 16 },
  }), [tokens, videoWidth, videoHeight]);

  // Show error state
  if (error) {
    return (
      <View style={[containerStyle, style]}>
        <View style={styles.thumbnailContainer}>
          <View style={styles.placeholder} />
          <View style={styles.progressContainer}>
            <AtomicText style={styles.errorText}>{error}</AtomicText>
          </View>
        </View>
      </View>
    );
  }

  // Show download progress
  if (isDownloading) {
    const progressPercent = Math.round(downloadProgress * 100);
    return (
      <View style={[containerStyle, style]}>
        <View style={styles.thumbnailContainer}>
          {thumbnailUrl ? (
            <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} contentFit="cover" />
          ) : (
            <View style={styles.placeholder} />
          )}
          <View style={[styles.progressContainer, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
            <AtomicText style={styles.progressText}>{progressPercent}%</AtomicText>
          </View>
        </View>
      </View>
    );
  }

  // Show video player
  if (showVideo && state.isPlayerValid && player) {
    if (__DEV__) {
      console.log("[VideoPlayer] Rendering VideoView:", { videoWidth, videoHeight });
    }
    return (
      <View style={[containerStyle, style]}>
        <VideoView
          player={player}
          style={styles.video}
          contentFit={contentFit}
          nativeControls={nativeControls}
        />
      </View>
    );
  }

  // Show thumbnail with play button
  return (
    <TouchableOpacity style={[containerStyle, style]} onPress={handlePlay} activeOpacity={0.8}>
      <View style={styles.thumbnailContainer}>
        {thumbnailUrl ? (
          <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} contentFit="cover" />
        ) : (
          <View style={styles.placeholder} />
        )}
        <View style={styles.playButtonContainer}>
          <View style={styles.playButton}>
            <AtomicIcon name="play" customSize={32} color="onPrimary" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
