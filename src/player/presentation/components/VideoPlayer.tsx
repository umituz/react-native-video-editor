/**
 * VideoPlayer Component
 * Reusable video player with caching, thumbnail, controls, and optional custom overlay
 */

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, type ViewStyle } from "react-native";
import { Image } from "expo-image";
// expo-video is optional — lazy require so it is not auto-installed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let VideoView: React.ComponentType<any> = () => null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  VideoView = require("expo-video").VideoView;
} catch {
  // expo-video not installed in consuming app
}
import { AtomicIcon, AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useResponsive } from "@umituz/react-native-design-system/responsive";

import type { VideoPlayerProps } from "../../types";
import { useVideoPlayerControl } from "../hooks/useVideoPlayerControl";
import { useVideoCaching } from "../hooks/useVideoCaching";
import { useControlsAutoHide } from "../hooks/useControlsAutoHide";
import { VideoPlayerOverlay } from "./VideoPlayerOverlay";

const DEFAULT_ASPECT_RATIO = 16 / 9;

/** Check if style provides its own sizing (width/height/aspectRatio/flex) */
const hasCustomSizing = (style: ViewStyle | undefined): boolean => {
  if (!style) return false;
  return (
    style.width !== undefined ||
    style.height !== undefined ||
    style.aspectRatio !== undefined ||
    style.flex !== undefined
  );
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  source,
  thumbnailUrl,
  loop = true,
  muted = false,
  autoPlay = false,
  showControls = false,
  nativeControls = true,
  contentFit = "cover",
  style,
  playbackRate = 1,
  filterOverlay,
  title,
  subtitle,
  onBack,
  onProgress,
}) => {
  const { width: screenWidth, horizontalPadding } = useResponsive();
  const tokens = useAppDesignTokens();
  const [userTriggeredPlay, setUserTriggeredPlay] = useState(false);
  const showVideo = autoPlay || userTriggeredPlay;

  // When showControls is true, disable native controls and show custom overlay
  const useNativeControls = showControls ? false : nativeControls;

  const { localUri, isDownloading, downloadProgress, error } = useVideoCaching(source);

  const { player, state, controls } = useVideoPlayerControl({
    source: localUri,
    loop,
    muted,
    autoPlay,
    playbackRate,
  });

  const { visible: controlsVisible, toggle: toggleControls } = useControlsAutoHide({
    isPlaying: state.isPlaying,
    autoHideDelay: 3000,
  });

  // Notify parent of progress changes
  useEffect(() => {
    if (onProgress && state.duration > 0) {
      onProgress(state.currentTime, state.duration);
    }
  }, [onProgress, state.currentTime, state.duration]);

  const handlePlay = useCallback(() => {
    setUserTriggeredPlay(true);
    controls.play();
  }, [controls]);

  // Calculate fallback dimensions only when style doesn't provide sizing
  const customSizing = hasCustomSizing(style as ViewStyle);
  const videoWidth = customSizing ? undefined : (screenWidth - horizontalPadding * 2);
  const videoHeight = videoWidth ? videoWidth / DEFAULT_ASPECT_RATIO : undefined;

  const containerStyle = useMemo(() => ({
    ...(videoWidth !== undefined && { width: videoWidth }),
    ...(videoHeight !== undefined && { height: videoHeight }),
    backgroundColor: tokens.colors.surface,
    borderRadius: 16,
    overflow: "hidden" as const,
  }), [tokens.colors.surface, videoWidth, videoHeight]);

  const styles = useMemo(() => StyleSheet.create({
    video: videoWidth !== undefined
      ? { width: videoWidth, height: videoHeight! }
      : { width: "100%", height: "100%" },
    thumbnailContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    thumbnail: videoWidth !== undefined
      ? { width: videoWidth, height: videoHeight! }
      : { width: "100%", height: "100%" },
    placeholder: {
      ...(videoWidth !== undefined ? { width: videoWidth, height: videoHeight! } : { flex: 1, width: "100%" }),
      backgroundColor: tokens.colors.surfaceSecondary,
    },
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

  if (showVideo && state.isPlayerValid && player) {
    return (
      <View style={[containerStyle, style]}>
        <VideoView
          player={player}
          style={styles.video}
          contentFit={contentFit}
          nativeControls={useNativeControls}
        />
        {filterOverlay && filterOverlay.opacity > 0 && (
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: filterOverlay.overlay, opacity: filterOverlay.opacity },
            ]}
            pointerEvents="none"
          />
        )}
        {showControls && (
          <VideoPlayerOverlay
            visible={controlsVisible}
            isPlaying={state.isPlaying}
            isMuted={state.isMuted}
            currentTime={state.currentTime}
            duration={state.duration}
            title={title}
            subtitle={subtitle}
            onTogglePlay={controls.toggle}
            onToggleMute={controls.toggleMute}
            onSeek={controls.seekTo}
            onBack={onBack}
            onTap={toggleControls}
          />
        )}
      </View>
    );
  }

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
