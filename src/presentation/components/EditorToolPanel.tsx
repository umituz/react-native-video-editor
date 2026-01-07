/**
 * Editor Tool Panel Component
 * Single Responsibility: Display editor tool buttons
 */

import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import type { Audio } from "../../domain/entities";

export interface EditorToolPanelProps {
  onAddText: () => void;
  onAddImage: () => void;
  onAddShape: () => void;
  onAudio: () => void;
  hasAudio: boolean;
}

export const EditorToolPanel: React.FC<EditorToolPanelProps> = ({
  onAddText,
  onAddImage,
  onAddShape,
  onAudio,
  hasAudio,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  return (
    <View
      style={[styles.toolPanel, { backgroundColor: tokens.colors.surface }]}
    >
      <AtomicText
        type="bodyMedium"
        style={{
          color: tokens.colors.textPrimary,
          fontWeight: "600",
          marginBottom: 12,
        }}
      >
        {t("editor.tools.title")}
      </AtomicText>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            styles.toolButton,
            { backgroundColor: tokens.colors.backgroundPrimary },
          ]}
          onPress={onAddText}
        >
          <AtomicIcon name="text-outline" size="md" color="primary" />
          <AtomicText
            type="labelSmall"
            style={{ color: tokens.colors.textPrimary, marginTop: 4 }}
          >
            {t("editor.tools.text")}
          </AtomicText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toolButton,
            { backgroundColor: tokens.colors.backgroundPrimary },
          ]}
          onPress={onAddImage}
        >
          <AtomicIcon name="image-outline" size="md" color="primary" />
          <AtomicText
            type="labelSmall"
            style={{ color: tokens.colors.textPrimary, marginTop: 4 }}
          >
            {t("editor.tools.image")}
          </AtomicText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toolButton,
            { backgroundColor: tokens.colors.backgroundPrimary },
          ]}
          onPress={onAddShape}
        >
          <AtomicIcon name="square-outline" size="md" color="primary" />
          <AtomicText
            type="labelSmall"
            style={{ color: tokens.colors.textPrimary, marginTop: 4 }}
          >
            {t("editor.tools.shape")}
          </AtomicText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toolButton,
            { backgroundColor: tokens.colors.backgroundPrimary },
          ]}
          onPress={onAudio}
        >
          <AtomicIcon name="musical-notes-outline" size="md" color="primary" />
          <AtomicText
            type="labelSmall"
            style={{ color: tokens.colors.textPrimary, marginTop: 4 }}
          >
            {t("editor.tools.audio")}
          </AtomicText>
          {hasAudio && (
            <View
              style={[
                styles.audioBadge,
                {
                  backgroundColor: tokens.colors.success,
                  borderColor: tokens.colors.surface,
                },
              ]}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toolButton,
            { backgroundColor: tokens.colors.backgroundPrimary },
          ]}
          onPress={() =>
            Alert.alert(
              t("editor.tools.effects"),
              t("editor.tools.effectsComingSoon"),
            )
          }
        >
          <AtomicIcon name="sparkles-outline" size="md" color="primary" />
          <AtomicText
            type="labelSmall"
            style={{ color: tokens.colors.textPrimary, marginTop: 4 }}
          >
            {t("editor.tools.effects")}
          </AtomicText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  toolPanel: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  toolButton: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  audioBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
});
