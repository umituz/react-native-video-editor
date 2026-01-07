/**
 * LayerContent Component
 * Renders different layer types (text, image, shape)
 */

import React from "react";
import { View, Image, Text as RNText, StyleSheet } from "react-native";
import {
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { Layer, TextLayer, ImageLayer, ShapeLayer } from "../../../domain/entities";

interface LayerContentProps {
  layer: Layer;
}

export const LayerContent: React.FC<LayerContentProps> = ({ layer }) => {
  const tokens = useAppDesignTokens();

  switch (layer.type) {
    case "text": {
      const textLayer = layer as TextLayer;
      return (
        <View style={styles.textContainer}>
          <RNText
            adjustsFontSizeToFit
            minimumFontScale={0.3}
            style={{
              fontSize: textLayer.fontSize,
              color: textLayer.color,
              fontWeight: textLayer.fontWeight,
              textAlign: textLayer.textAlign,
              width: "100%",
              height: "100%",
              textAlignVertical: "center",
            }}
          >
            {textLayer.content}
          </RNText>
        </View>
      );
    }

    case "image": {
      const imageLayer = layer as ImageLayer;
      return imageLayer.uri ? (
        <Image
          source={{ uri: imageLayer.uri }}
          style={styles.layerImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.imagePlaceholder, { backgroundColor: tokens.colors.surface }]}>
          <AtomicIcon name="image-outline" size="md" color="secondary" />
        </View>
      );
    }

    case "shape": {
      const shapeLayer = layer as ShapeLayer;
      return (
        <View
          style={[
            styles.shapeLayer,
            {
              backgroundColor: shapeLayer.fillColor,
              borderRadius: shapeLayer.shape === "circle" ? 9999 : 0,
              borderColor: shapeLayer.borderColor,
              borderWidth: shapeLayer.borderWidth || 0,
            },
          ]}
        />
      );
    }

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  textContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    overflow: "hidden",
  },
  layerImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  shapeLayer: {
    width: "100%",
    height: "100%",
  },
});
