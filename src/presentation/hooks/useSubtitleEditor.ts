/**
 * useSubtitleEditor Hook
 * CRUD state management for subtitles
 */

import { useState, useCallback, useMemo } from "react";
import type { Subtitle, SubtitleStyle } from "../../domain/entities/video-project.types";
import { DEFAULT_SUBTITLE_STYLE } from "../../infrastructure/constants/subtitle.constants";
import { generateSRT } from "../../infrastructure/utils/srt.utils";

function generateId(): string {
  return `sub_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export interface UseSubtitleEditorReturn {
  subtitles: Subtitle[];
  addSubtitle: (text: string, startTime: number, endTime: number, style?: SubtitleStyle) => void;
  updateSubtitle: (id: string, patch: Partial<Omit<Subtitle, "id">>) => void;
  deleteSubtitle: (id: string) => void;
  clearSubtitles: () => void;
  getActiveSubtitle: (currentTime: number) => Subtitle | null;
  exportSRT: () => string;
  setSubtitles: (subtitles: Subtitle[]) => void;
}

export function useSubtitleEditor(initial: Subtitle[] = []): UseSubtitleEditorReturn {
  const [subtitles, setSubtitles] = useState<Subtitle[]>(initial);

  const addSubtitle = useCallback((
    text: string,
    startTime: number,
    endTime: number,
    style: SubtitleStyle = { ...DEFAULT_SUBTITLE_STYLE },
  ) => {
    const newSub: Subtitle = { id: generateId(), text, startTime, endTime, style };
    setSubtitles((prev) => [...prev, newSub].sort((a, b) => a.startTime - b.startTime));
  }, []);

  const updateSubtitle = useCallback((id: string, patch: Partial<Omit<Subtitle, "id">>) => {
    setSubtitles((prev) =>
      prev
        .map((s) => (s.id === id ? { ...s, ...patch } : s))
        .sort((a, b) => a.startTime - b.startTime),
    );
  }, []);

  const deleteSubtitle = useCallback((id: string) => {
    setSubtitles((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const clearSubtitles = useCallback(() => setSubtitles([]), []);

  const getActiveSubtitle = useCallback(
    (currentTime: number): Subtitle | null =>
      subtitles.find((s) => currentTime >= s.startTime && currentTime <= s.endTime) ?? null,
    [subtitles],
  );

  const exportSRT = useCallback((): string => generateSRT(subtitles), [subtitles]);

  return useMemo(() => ({
    subtitles,
    addSubtitle,
    updateSubtitle,
    deleteSubtitle,
    clearSubtitles,
    getActiveSubtitle,
    exportSRT,
    setSubtitles,
  }), [subtitles, addSubtitle, updateSubtitle, deleteSubtitle, clearSubtitles, getActiveSubtitle, exportSRT]);
}
