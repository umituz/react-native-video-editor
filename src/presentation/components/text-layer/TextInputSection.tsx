/**
 * TextInputSection Component
 * Text input for text layer editor
 */

import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useLocalization } from "@umituz/react-native-settings";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

interface TextInputSectionProps {
  text: string;
  onChangeText: (text: string) => void;
}

export const TextInputSection: React.FC<TextInputSectionProps> = ({
  text,
  onChangeText,
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
        {t("editor.properties.text")}
      </AtomicText>
      <TextInput
        style={[
          styles.textInput,
          {
            backgroundColor: tokens.colors.surface,
            color: tokens.colors.textPrimary,
            borderColor: tokens.colors.borderLight,
          },
        ]}
        placeholder="Enter your text..."
        placeholderTextColor={tokens.colors.textSecondary}
        value={text}
        onChangeText={onChangeText}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
  },
});
