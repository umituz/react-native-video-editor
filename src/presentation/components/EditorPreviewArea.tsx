/**
 * Editor Preview Area Component
 * Single Responsibility: Display video preview canvas and playback controls
 * Optimized to prevent unnecessary re-renders
 */

import React, { useMemo, useCallback } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { DraggableLayer } from "./DraggableLayer";
import type { Scene, Layer } from "../../domain/entities/video-project.types";
import { createPreviewStyles } from "./EditorPreviewArea.styles";
import { formatTimeDisplay, calculateProgressPercent } from "../../infrastructure/utils/time-calculations.utils";

const { width } = Dimensions.get("window");
const PREVIEW_ASPECT_RATIO = 16 / 9;
const PREVIEW_HEIGHT = width / PREVIEW_ASPECT_RATIO;

interface EditorPreviewAreaProps {
  scene: Scene;
  selectedLayerId: string | null;
  isPlaying: boolean;
  currentTime: number;
  onLayerSelect: (layerId: string) => void;
  onLayerPositionChange: (layerId: string, x: number, y: number) => void;
  onLayerSizeChange: (layerId: string, width: number, height: number) => void;
  onLayerActionsPress: (layer: Layer) => void;
  onPlayPause: () => void;
  onReset: () => void;
}

export const EditorPreviewArea: React.FC<EditorPreviewAreaProps> = React.memo(({
  scene,
  selectedLayerId,
  isPlaying,
  currentTime,
  onLayerSelect,
  onLayerPositionChange,
  onLayerSizeChange,
  onLayerActionsPress,
  onPlayPause,
  onReset,
}) => {
  const tokens = useAppDesignTokens();
  const styles = useMemo(() => createPreviewStyles(tokens), [tokens]);

  // Memoize canvas style
  const canvasStyle = useMemo(() => [
    styles.previewCanvas,
    {
      backgroundColor:
        scene.background.type === "color"
          ? scene.background.value
          : tokens.colors.surfaceSecondary,
      height: PREVIEW_HEIGHT,
    },
  ], [styles.previewCanvas, scene.background.type, scene.background.value, tokens.colors.surfaceSecondary]);

  // Memoize empty preview text style
  const emptyTextStyle = useMemo(() => ({
    color: tokens.colors.textSecondary,
    marginTop: 12,
  }), [tokens.colors.textSecondary]);

  // Memoize layer actions button style
  const layerActionsButtonStyle = useMemo(() => [
    styles.layerActionsButton,
    { backgroundColor: tokens.colors.primary },
  ], [styles.layerActionsButton, tokens.colors.primary]);

  // Stable callbacks for layer operations
  const handleLayerSelect = useCallback((layerId: string) => {
    onLayerSelect(layerId);
  }, [onLayerSelect]);

  const createLayerPositionHandler = useCallback((layerId: string) => {
    return (x: number, y: number) => {
      onLayerPositionChange(layerId, x, y);
    };
  }, [onLayerPositionChange]);

  const createLayerSizeHandler = useCallback((layerId: string) => {
    return (width: number, height: number) => {
      onLayerSizeChange(layerId, width, height);
    };
  }, [onLayerSizeChange]);

  // Stable callback for layer actions button
  const handleLayerActionsPress = useCallback(() => {
    const layer = scene.layers.find((l) => l.id === selectedLayerId);
    if (layer) {
      onLayerActionsPress(layer);
    }
  }, [scene.layers, selectedLayerId, onLayerActionsPress]);

  // Memoize playback controls style
  const playbackControlsStyle = useMemo(() => [
    styles.playbackControls,
    { backgroundColor: tokens.colors.surface },
  ], [styles.playbackControls, tokens.colors.surface]);

  // Memoize progress bar container style
  const progressBarContainerStyle = useMemo(() => [
    styles.progressBarContainer,
    { backgroundColor: tokens.colors.borderLight },
  ], [styles.progressBarContainer, tokens.colors.borderLight]);

  // Memoize progress bar style
  const progressBarStyle = useMemo(() => ({
    ...styles.progressBar,
    width: `${calculateProgressPercent(currentTime, scene.duration)}%` as any,
    backgroundColor: tokens.colors.primary,
  }), [styles.progressBar, currentTime, scene.duration, tokens.colors.primary]);

  // Memoize time text style
  const timeTextStyle = useMemo(() => ({
    color: tokens.colors.textSecondary,
  }), [tokens.colors.textSecondary]);

  return (
    <View style={styles.previewSection}>
      <View style={canvasStyle}>
        {scene.layers.length === 0 ? (
          <View style={styles.emptyPreview}>
            <AtomicIcon name="film-outline" size="xl" color="secondary" />
            <AtomicText
              type="bodyMedium"
              style={emptyTextStyle}
            >
              Canvas is empty. Add layers to get started.
            </AtomicText>
          </View>
        ) : (
          <>
            {scene.layers.map((layer) => (
              <DraggableLayer
                key={layer.id}
                layer={layer}
                canvasWidth={width}
                canvasHeight={PREVIEW_HEIGHT}
                isSelected={selectedLayerId === layer.id}
                onSelect={() => handleLayerSelect(layer.id)}
                onPositionChange={createLayerPositionHandler(layer.id)}
                onSizeChange={createLayerSizeHandler(layer.id)}
              />
            ))}

            {selectedLayerId && (
              <TouchableOpacity
                style={layerActionsButtonStyle}
                onPress={handleLayerActionsPress}
              >
                <AtomicIcon
                  name="ellipsis-vertical"
                  size="md"
                  color="onSurface"
                />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>

      <View style={playbackControlsStyle}>
        <View style={styles.playbackRow}>
          <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
            <AtomicIcon
              name={isPlaying ? "pause" : "play"}
              size="lg"
              color="primary"
            />
          </TouchableOpacity>

          <View style={styles.timeDisplay}>
            <AtomicText
              type="labelSmall"
              style={timeTextStyle}
            >
              {formatTimeDisplay(currentTime, true)} / {formatTimeDisplay(scene.duration, true)}
            </AtomicText>
          </View>

          <TouchableOpacity onPress={onReset} style={styles.resetButton}>
            <AtomicIcon name="refresh" size="md" color="secondary" />
          </TouchableOpacity>
        </View>

        <View style={progressBarContainerStyle}>
          <View style={progressBarStyle} />
        </View>
      </View>
    </View>
  );
});

EditorPreviewArea.displayName = 'EditorPreviewArea';
