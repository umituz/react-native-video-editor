/**
 * VideoProgressBar Component
 * Seekable progress bar with time labels for video playback
 */

import React, { useCallback, useRef } from "react";
import { View, StyleSheet, type LayoutChangeEvent } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

import type { VideoProgressBarProps } from "../../types";
import { formatTimeDisplay } from "../../../infrastructure/utils/srt.utils";

const DEFAULT_HEIGHT = 4;

export const VideoProgressBar: React.FC<VideoProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
  showTimeLabels = true,
  height = DEFAULT_HEIGHT,
  trackColor,
  fillColor,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const progressPercent = duration > 0 ? Math.min(currentTime / duration, 1) * 100 : 0;
  const barWidthRef = useRef(0);

  const resolvedTrackColor = trackColor ?? "rgba(255,255,255,0.3)";
  const resolvedFillColor = fillColor ?? tokens.colors.primary;

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    barWidthRef.current = e.nativeEvent.layout.width;
  }, []);

  const handleSeek = useCallback(
    (e: { nativeEvent: { locationX: number } }) => {
      if (!onSeek || duration <= 0 || barWidthRef.current <= 0) return;
      const ratio = Math.max(0, Math.min(1, e.nativeEvent.locationX / barWidthRef.current));
      onSeek(ratio * duration);
    },
    [onSeek, duration],
  );

  return (
    <View style={[barStyles.container, style]}>
      <View style={barStyles.row}>
        {showTimeLabels && (
          <AtomicText style={barStyles.timeText}>{formatTimeDisplay(currentTime)}</AtomicText>
        )}
        <View
          style={[barStyles.barContainer, { height, borderRadius: height / 2, backgroundColor: resolvedTrackColor }]}
          onLayout={handleLayout}
          onStartShouldSetResponder={() => Boolean(onSeek)}
          onResponderRelease={handleSeek}
        >
          <View style={[barStyles.barFill, { borderRadius: height / 2, backgroundColor: resolvedFillColor, width: `${progressPercent}%` }]} />
        </View>
        {showTimeLabels && (
          <AtomicText style={[barStyles.timeText, { textAlign: "right" }]}>
            {formatTimeDisplay(duration)}
          </AtomicText>
        )}
      </View>
    </View>
  );
};

const barStyles = StyleSheet.create({
  container: { width: "100%" },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  timeText: { color: "#FFFFFF", fontSize: 12, fontWeight: "500", minWidth: 40 },
  barContainer: { flex: 1, overflow: "hidden" },
  barFill: { height: "100%" },
});
