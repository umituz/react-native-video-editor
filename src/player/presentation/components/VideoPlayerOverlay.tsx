/**
 * VideoPlayerOverlay Component
 * Custom overlay controls: top bar (title, back), center play/pause, bottom bar (progress, mute)
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { AtomicIcon, AtomicText } from "@umituz/react-native-design-system/atoms";

import type { VideoPlayerOverlayProps } from "../../types";
import { VideoProgressBar } from "./VideoProgressBar";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  subtitleText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    marginTop: 2,
  },
  centerArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerPlayButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  controlButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const VideoPlayerOverlay: React.FC<VideoPlayerOverlayProps> = ({
  visible,
  isPlaying,
  isMuted,
  currentTime,
  duration,
  title,
  subtitle,
  onTogglePlay,
  onToggleMute,
  onSeek,
  onBack,
  onTap,
}) => {
  const hasTopBar = Boolean(onBack || title || subtitle);

  if (!visible) {
    return (
      <TouchableWithoutFeedback onPress={onTap}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={onTap}>
      <View style={styles.overlay}>
        {/* Top Bar — only render when there's content */}
        {hasTopBar && (
          <View style={styles.topBar}>
            {onBack && (
              <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
                <AtomicIcon name="chevron-back" customSize={22} color="onPrimary" />
              </TouchableOpacity>
            )}
            {(title || subtitle) && (
              <View style={styles.titleContainer}>
                {title && <AtomicText style={styles.titleText} numberOfLines={1}>{title}</AtomicText>}
                {subtitle && <AtomicText style={styles.subtitleText} numberOfLines={1}>{subtitle}</AtomicText>}
              </View>
            )}
          </View>
        )}

        {/* Center Play/Pause */}
        <View style={styles.centerArea}>
          <TouchableOpacity style={styles.centerPlayButton} onPress={onTogglePlay} activeOpacity={0.7}>
            <AtomicIcon
              name={isPlaying ? "pause" : "play"}
              customSize={36}
              color="onPrimary"
            />
          </TouchableOpacity>
        </View>

        {/* Bottom Bar — progress + mute */}
        <View style={styles.bottomBar}>
          <VideoProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
            showTimeLabels
          />
          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.controlButton} onPress={onToggleMute} activeOpacity={0.7}>
              <AtomicIcon
                name={isMuted ? "volume-x" : "volume-2"}
                customSize={18}
                color="onPrimary"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
