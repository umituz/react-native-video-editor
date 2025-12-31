/**
 * useEditorBottomSheet Hook
 * Single Responsibility: Bottom sheet state management
 */

import { useState, useCallback } from "react";
import { Alert } from "react-native";

export interface BottomSheetContent {
  title: string;
  children: React.ReactNode;
}

export interface UseEditorBottomSheetReturn {
  isOpen: boolean;
  content: BottomSheetContent | null;
  openBottomSheet: (content: BottomSheetContent) => void;
  closeBottomSheet: () => void;
}

export function useEditorBottomSheet(): UseEditorBottomSheetReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<BottomSheetContent | null>(null);

  const openBottomSheet = useCallback((sheetContent: BottomSheetContent) => {
    setContent(sheetContent);
    setIsOpen(true);
    // TODO: Implement actual bottom sheet
    // For now, using Alert as fallback
  }, []);

  const closeBottomSheet = useCallback(() => {
    setIsOpen(false);
    setContent(null);
  }, []);

  return {
    isOpen,
    content,
    openBottomSheet,
    closeBottomSheet,
  };
}
