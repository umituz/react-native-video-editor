/**
 * useCollageEditor Hook
 * State management for collage editor
 */

import { useState, useCallback } from "react";
import {
  COLLAGE_LAYOUTS,
  DEFAULT_COLLAGE_LAYOUT,
  DEFAULT_COLLAGE_SPACING,
  DEFAULT_COLLAGE_BORDER_RADIUS,
} from "../../infrastructure/constants/collage.constants";
import type { CollageLayout } from "../../infrastructure/constants/collage.constants";

export interface UseCollageEditorReturn {
  layout: CollageLayout;
  images: (string | null)[];
  spacing: number;
  borderRadius: number;
  setLayout: (layout: CollageLayout) => void;
  setImage: (index: number, uri: string) => void;
  clearImage: (index: number) => void;
  setSpacing: (value: number) => void;
  setBorderRadius: (value: number) => void;
  filledCount: number;
  allLayouts: CollageLayout[];
}

export function useCollageEditor(): UseCollageEditorReturn {
  const [layout, setLayoutState] = useState<CollageLayout>(DEFAULT_COLLAGE_LAYOUT);
  const [images, setImages] = useState<(string | null)[]>(
    new Array(DEFAULT_COLLAGE_LAYOUT.count).fill(null),
  );
  const [spacing, setSpacing] = useState(DEFAULT_COLLAGE_SPACING);
  const [borderRadius, setBorderRadius] = useState(DEFAULT_COLLAGE_BORDER_RADIUS);

  const setLayout = useCallback((newLayout: CollageLayout) => {
    setLayoutState(newLayout);
    setImages(new Array(newLayout.count).fill(null));
  }, []);

  const setImage = useCallback((index: number, uri: string) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = uri;
      return next;
    });
  }, []);

  const clearImage = useCallback((index: number) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }, []);

  const filledCount = images.filter((img) => img !== null).length;

  return {
    layout,
    images,
    spacing,
    borderRadius,
    setLayout,
    setImage,
    clearImage,
    setSpacing,
    setBorderRadius,
    filledCount,
    allLayouts: COLLAGE_LAYOUTS,
  };
}
