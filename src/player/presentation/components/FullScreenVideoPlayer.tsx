/**
 * FullScreenVideoPlayer Component
 * Modal-based fullscreen video player with custom overlay controls
 */

import React, { useMemo, useCallback } from "react";
import { View, Modal, StyleSheet, StatusBar } from "react-native";
import { Image } from "expo-image";
// expo-video is optional — lazy require
let VideoView: React.ComponentType<any> = () => null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  VideoView = require("expo-video").VideoView;
} catch {
  // expo-video not installed
}
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

import type { FullScreenVideoPlayerProps } from "../../types";
import { useVideoPlayerControl } from "../hooks/useVideoPlayerControl";
import { useVideoCaching } from "../hooks/useVideoCaching";
import { useControlsAutoHide } from "../hooks/useControlsAutoHide";
import { VideoPlayerOverlay } from "./VideoPlayerOverlay";

export const FullScreenVideoPlayer: React.FC<FullScreenVideoPlayerProps> = ({
  visible,
  source,
  title,
  subtitle,
  thumbnailUrl,
  onClose,
  loop = true,
  autoPlay = true,
}) => {
  const tokens = useAppDesignTokens();

  // Only cache/play when modal is visible
  const { localUri, isDownloading, downloadProgress, error } = useVideoCaching(
    visible ? source : null,
  );

  const { player, state, controls } = useVideoPlayerControl({
    source: visible ? localUri : null,
    loop,
    muted: false,
    autoPlay,
  });

  const { visible: controlsVisible, toggle: toggleControls } = useControlsAutoHide({
    isPlaying: state.isPlaying,
    autoHideDelay: 3000,
  });

  const handleClose = useCallback(() => {
    controls.pause();
    onClose();
  }, [controls, onClose]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#000000",
          justifyContent: "center",
          alignItems: "center",
        },
        video: {
          width: "100%",
          height: "100%",
        },
        centerContent: {
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        progressText: {
          color: "#FFFFFF",
          fontSize: 18,
          fontWeight: "600",
        },
        errorText: {
          color: tokens.colors.error,
          fontSize: 16,
          textAlign: "center",
          padding: 24,
        },
        thumbnail: {
          ...StyleSheet.absoluteFillObject,
        },
      }),
    [tokens.colors.error],
  );

  const renderContent = () => {
    if (error) {
      return (
        <View style={styles.container}>
          <AtomicText style={styles.errorText}>{error}</AtomicText>
        </View>
      );
    }

    if (isDownloading) {
      return (
        <View style={styles.container}>
          {thumbnailUrl && (
            <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} contentFit="cover" />
          )}
          <View style={styles.centerContent}>
            <AtomicText style={styles.progressText}>
              {Math.round(downloadProgress * 100)}%
            </AtomicText>
          </View>
        </View>
      );
    }

    if (state.isPlayerValid && player) {
      return (
        <View style={styles.container}>
          <VideoView
            player={player}
            style={styles.video}
            contentFit="contain"
            nativeControls={false}
          />
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
            onBack={handleClose}
            onTap={toggleControls}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {thumbnailUrl && (
          <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} contentFit="cover" />
        )}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      supportedOrientations={["portrait", "landscape"]}
      onRequestClose={handleClose}
    >
      <StatusBar hidden={visible} />
      {renderContent()}
    </Modal>
  );
};
