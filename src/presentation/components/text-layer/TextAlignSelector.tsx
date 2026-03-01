/**
 * TextAlignSelector Component
 * Text alignment selector for text layer
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalization } from "@umituz/react-native-settings";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { TEXT_ALIGNS } from "../../../infrastructure/constants/text-layer.constants";

interface TextAlignSelectorProps {
  textAlign: "left" | "center" | "right";
  onTextAlignChange: (align: "left" | "center" | "right") => void;
}

export const TextAlignSelector: React.FC<TextAlignSelectorProps> = ({
  textAlign,
  onTextAlignChange,
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
        {t("editor.properties.text_align")}
      </AtomicText>
      <View style={styles.alignButtons}>
        {TEXT_ALIGNS.map((align) => (
          <TouchableOpacity
            key={align.value}
            style={[
              styles.alignButton,
              {
                backgroundColor:
                  textAlign === align.value
                    ? tokens.colors.primary
                    : tokens.colors.surface,
                borderColor:
                  textAlign === align.value
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
              },
            ]}
            onPress={() => onTextAlignChange(align.value)}
          >
            <AtomicIcon
              name={align.icon}
              size="md"
              color={textAlign === align.value ? "onSurface" : "secondary"}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  alignButtons: {
    flexDirection: "row",
    gap: 8,
  },
  alignButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
