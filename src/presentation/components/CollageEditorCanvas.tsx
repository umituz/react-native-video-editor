/**
 * CollageEditorCanvas Component
 * Collage layout canvas with image cells, layout picker, spacing and border radius controls
 */

import React from "react";
import { View, Dimensions } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { CollageCanvas } from "./collage/CollageCanvas";
import { CollageControls } from "./collage/CollageControls";
import { CollageLayoutSelector } from "./collage/CollageLayoutSelector";
import type { CollageLayout } from "../../infrastructure/constants/collage.constants";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface CollageEditorCanvasProps {
  layout: CollageLayout;
  images: (string | null)[];
  spacing: number;
  borderRadius: number;
  onSelectLayout: (layout: CollageLayout) => void;
  onCellPress: (index: number) => void;
  onSpacingChange: (value: number) => void;
  onBorderRadiusChange: (value: number) => void;
  t: (key: string) => string;
  canvasSize?: number;
}

export const CollageEditorCanvas: React.FC<CollageEditorCanvasProps> = ({
  layout,
  images,
  spacing,
  borderRadius,
  onSelectLayout,
  onCellPress,
  onSpacingChange,
  onBorderRadiusChange,
  t,
  canvasSize,
}) => {
  const tokens = useAppDesignTokens();
  const size = canvasSize ?? SCREEN_WIDTH - tokens.spacing.md * 2;

  return (
    <View>
      <CollageCanvas
        layout={layout}
        images={images}
        spacing={spacing}
        borderRadius={borderRadius}
        onCellPress={onCellPress}
        size={size}
      />

      <CollageControls
        spacing={spacing}
        borderRadius={borderRadius}
        onSpacingChange={onSpacingChange}
        onBorderRadiusChange={onBorderRadiusChange}
        t={t}
      />

      <View style={{ paddingTop: tokens.spacing.sm }}>
        <AtomicText
          type="labelSmall"
          color="textSecondary"
          style={{ paddingHorizontal: tokens.spacing.md, marginBottom: tokens.spacing.xs }}
        >
          {t("editor.collage.layout") || "Layout"}
        </AtomicText>
        <CollageLayoutSelector selected={layout} onSelect={onSelectLayout} />
      </View>
    </View>
  );
};
