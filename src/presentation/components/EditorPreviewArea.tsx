/**
 * Editor Preview Area Component
 * Single Responsibility: Display video preview canvas and playback controls
 */

import React, { useMemo } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { DraggableLayer } from "./DraggableLayer";
import type { Scene, Layer } from "../../domain/entities";
import { createPreviewStyles } from "./EditorPreviewArea.styles";

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

export const EditorPreviewArea: React.FC<EditorPreviewAreaProps> = ({
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

  return (
    <View style={styles.previewSection}>
      <View
        style={[
          styles.previewCanvas,
          {
            backgroundColor:
              scene.background.type === "color"
                ? scene.background.value
                : tokens.colors.surfaceSecondary,
            height: PREVIEW_HEIGHT,
          },
        ]}
      >
        {scene.layers.length === 0 ? (
          <View style={styles.emptyPreview}>
            <AtomicIcon name="film-outline" size="xl" color="secondary" />
            <AtomicText
              type="bodyMedium"
              style={{ color: tokens.colors.textSecondary, marginTop: 12 }}
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
                onSelect={() => onLayerSelect(layer.id)}
                onPositionChange={(x, y) =>
                  onLayerPositionChange(layer.id, x, y)
                }
                onSizeChange={(w, h) => onLayerSizeChange(layer.id, w, h)}
              />
            ))}

            {selectedLayerId && (
              <TouchableOpacity
                style={[
                  styles.layerActionsButton,
                  { backgroundColor: tokens.colors.primary },
                ]}
                onPress={() => {
                  const layer = scene.layers.find(
                    (l) => l.id === selectedLayerId,
                  );
                  if (layer) {
                    onLayerActionsPress(layer);
                  }
                }}
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

      <View
        style={[
          styles.playbackControls,
          { backgroundColor: tokens.colors.surface },
        ]}
      >
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
              style={{ color: tokens.colors.textSecondary }}
            >
              {Math.floor(currentTime / 1000)}s /{" "}
              {Math.floor(scene.duration / 1000)}s
            </AtomicText>
          </View>

          <TouchableOpacity onPress={onReset} style={styles.resetButton}>
            <AtomicIcon name="refresh" size="md" color="secondary" />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.progressBarContainer,
            { backgroundColor: tokens.colors.borderLight },
          ]}
        >
          <View
            style={[
              styles.progressBar,
              {
                width: `${(currentTime / scene.duration) * 100}%`,
                backgroundColor: tokens.colors.primary,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};
