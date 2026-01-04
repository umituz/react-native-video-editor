/**
 * VideoPlayer Component
 * Reusable video player with thumbnail and controls
 */

import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  type ViewStyle,
} from "react-native";
import { Image } from "expo-image";
import { VideoView } from "expo-video";
import {
  useAppDesignTokens,
  AtomicIcon,
  useResponsive,
} from "@umituz/react-native-design-system";

import type { VideoPlayerProps } from "../../types";
import { useVideoPlayerControl } from "../hooks/useVideoPlayerControl";

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
  const tokens = useAppDesignTokens();
  const { width: screenWidth, horizontalPadding } = useResponsive();
  const [showVideo, setShowVideo] = useState(autoPlay);

  const { player, state, controls } = useVideoPlayerControl({
    source,
    loop,
    muted,
    autoPlay: false,
  });

  useEffect(() => {
    if (showVideo && state.isPlayerValid && player) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        // eslint-disable-next-line no-console
        console.log("[VideoPlayer] Starting playback...");
      }
      controls.play();
    }
  }, [showVideo, state.isPlayerValid, player, controls]);

  const handlePlay = useCallback(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      // eslint-disable-next-line no-console
      console.log("[VideoPlayer] handlePlay called, source:", source);
    }
    setShowVideo(true);
  }, [source]);

  // Calculate absolute dimensions for VideoView (expo-video requires pixel values)
  const videoWidth = getWidthFromStyle(style as ViewStyle) ?? (screenWidth - horizontalPadding * 2);
  const videoHeight = videoWidth / ASPECT_RATIO;

  const containerStyle = useMemo(() => ({
    width: videoWidth,
    height: videoHeight,
    backgroundColor: tokens.colors.surface,
    borderRadius: 16,
    overflow: "hidden" as const,
  }), [tokens.colors.surface, videoWidth, videoHeight]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        video: {
          width: videoWidth,
          height: videoHeight,
        },
        thumbnailContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        thumbnail: {
          width: videoWidth,
          height: videoHeight,
        },
        placeholder: {
          width: videoWidth,
          height: videoHeight,
          backgroundColor: tokens.colors.surfaceSecondary,
        },
        playButtonContainer: {
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
        },
        playButton: {
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: tokens.colors.primary,
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 4,
        },
      }),
    [tokens, videoWidth, videoHeight]
  );

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    // eslint-disable-next-line no-console
    console.log("[VideoPlayer] state:", {
      showVideo,
      isPlayerValid: state.isPlayerValid,
      hasPlayer: !!player,
      source,
    });
  }

  if (showVideo && state.isPlayerValid && player) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      // eslint-disable-next-line no-console
      console.log("[VideoPlayer] Rendering VideoView");
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

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={handlePlay}
      activeOpacity={0.8}
    >
      <View style={styles.thumbnailContainer}>
        {thumbnailUrl ? (
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnail}
            contentFit="cover"
          />
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
