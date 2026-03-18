/**
 * useSubtitleForm Hook
 * Manages subtitle form state and operations
 */

import { useState, useCallback, useMemo } from "react";
import { DEFAULT_SUBTITLE_STYLE } from "../../../infrastructure/constants/subtitle.constants";
import type { Subtitle, SubtitleStyle } from "../../../domain/entities/video-project.types";

interface UseSubtitleFormReturn {
  text: string;
  startTime: number;
  endTime: number;
  style: SubtitleStyle;
  editing: Subtitle | null;
  showModal: boolean;
  openAdd: (currentTime: number) => void;
  openEdit: (subtitle: Subtitle) => void;
  close: () => void;
  save: (onAdd: (text: string, start: number, end: number, style: SubtitleStyle) => void, onUpdate: (id: string, patch: Partial<Omit<Subtitle, "id">>) => void) => void;
  setText: (text: string) => void;
  setStartTime: (time: number) => void;
  setEndTime: (time: number) => void;
  setStyle: (style: SubtitleStyle) => void;
}

export function useSubtitleForm(): UseSubtitleFormReturn {
  const [editing, setEditing] = useState<Subtitle | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(3);
  const [style, setStyle] = useState<SubtitleStyle>({ ...DEFAULT_SUBTITLE_STYLE });

  const openAdd = useCallback((currentTime: number) => {
    setEditing(null);
    setText("");
    setStartTime(Math.floor(currentTime));
    setEndTime(Math.floor(currentTime) + 3);
    setStyle({ ...DEFAULT_SUBTITLE_STYLE });
    setShowModal(true);
  }, []);

  const openEdit = useCallback((subtitle: Subtitle) => {
    setEditing(subtitle);
    setText(subtitle.text);
    setStartTime(subtitle.startTime);
    setEndTime(subtitle.endTime);
    setStyle({ ...subtitle.style });
    setShowModal(true);
  }, []);

  const close = useCallback(() => {
    setShowModal(false);
  }, []);

  const save = useCallback((
    onAdd: (text: string, start: number, end: number, style: SubtitleStyle) => void,
    onUpdate: (id: string, patch: Partial<Omit<Subtitle, "id">>) => void,
  ) => {
    if (!text.trim()) return;

    const resolvedEnd = Math.max(endTime, startTime + 0.5);

    if (editing) {
      onUpdate(editing.id, {
        text: text.trim(),
        startTime,
        endTime: resolvedEnd,
        style,
      });
    } else {
      onAdd(text.trim(), startTime, resolvedEnd, style);
    }

    close();
  }, [text, editing, startTime, endTime, style, close]);

  return {
    text,
    startTime,
    endTime,
    style,
    editing,
    showModal,
    openAdd,
    openEdit,
    close,
    save,
    setText,
    setStartTime,
    setEndTime,
    setStyle,
  };
}
