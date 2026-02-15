/**
 * FontSizeSelector Component
 * Font size selector for text layer
 */

import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalization } from "@umituz/react-native-settings";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { FONT_SIZES } from "../../../infrastructure/constants/text-layer.constants";

interface FontSizeSelectorProps {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

export const FontSizeSelector: React.FC<FontSizeSelectorProps> = ({
  fontSize,
  onFontSizeChange,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.section}>
      <AtomicText
        type="bodyMedium"
        style={{
          color: tokens.colors.textPrimary,
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        {t("editor.properties.font_size")}: {fontSize}px
      </AtomicText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {FONT_SIZES.map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeButton,
              {
                backgroundColor:
                  fontSize === size
                    ? tokens.colors.primary
                    : tokens.colors.surface,
                borderColor:
                  fontSize === size
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
              },
            ]}
            onPress={() => onFontSizeChange(size)}
          >
            <AtomicText
              type="bodySmall"
              style={{
                color:
                  fontSize === size ? tokens.colors.onPrimary : tokens.colors.textPrimary,
                fontWeight: fontSize === size ? "600" : "400",
              }}
            >
              {size}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sizeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
});
