/**
 * Generic List Hook
 * Replaces: SubtitleListPanel, LayerList, SceneList patterns
 */

import { useState, useCallback, useMemo } from "react";

export interface ListConfig<T> {
  items: T[];
  keyExtractor: (item: T) => string;
  initialSelection?: string[];
  multiSelect?: boolean;
}

export interface ListReturn<T> {
  selectedIds: Set<string>;
  selectedItems: T[];
  isSelected: (id: string) => boolean;
  toggleSelection: (id: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
  filteredItems: T[];
  filter: (predicate: (item: T) => boolean) => void;
  clearFilter: () => void;
}

export function useList<T>({ items, keyExtractor, initialSelection = [], multiSelect = false }: ListConfig<T>): ListReturn<T> {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(initialSelection));
  const [filterPredicate, setFilterPredicate] = useState<((item: T) => boolean) | null>(null);

  const selectedItems = useMemo(() => items.filter((item) => selectedIds.has(keyExtractor(item))), [items, selectedIds, keyExtractor]);
  const filteredItems = useMemo(() => filterPredicate ? items.filter(filterPredicate) : items, [items, filterPredicate]);

  const isSelected = useCallback((id: string) => selectedIds.has(id), [selectedIds]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (multiSelect) {
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
      } else {
        newSet.clear();
        newSet.add(id);
      }
      return newSet;
    });
  }, [multiSelect]);

  const selectAll = useCallback(() => setSelectedIds(new Set(items.map(keyExtractor))), [items, keyExtractor]);
  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);
  const filter = useCallback((predicate: (item: T) => boolean) => setFilterPredicate(() => predicate), []);
  const clearFilter = useCallback(() => setFilterPredicate(null), []);

  return { selectedIds, selectedItems, isSelected, toggleSelection, selectAll, clearSelection, filteredItems, filter, clearFilter };
}

export interface UseSelectionConfig {
  multiSelect?: boolean;
  maxSelections?: number;
}

export interface UseSelectionReturn {
  selectedIds: Set<string>;
  isSelected: (id: string) => boolean;
  toggleSelection: (id: string) => void;
  select: (id: string) => void;
  deselect: (id: string) => void;
  clearSelection: () => void;
  selectionCount: number;
}

export function useSelection({ multiSelect = false, maxSelections }: UseSelectionConfig = {}): UseSelectionReturn {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());

  const isSelected = useCallback((id: string) => selectedIds.has(id), [selectedIds]);
  const selectionCount = selectedIds.size;

  const select = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (!multiSelect) return new Set([id]);
      if (maxSelections && prev.size >= maxSelections && !prev.has(id)) return prev;
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  }, [multiSelect, maxSelections]);

  const deselect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (!multiSelect) return new Set([id]);
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (maxSelections && newSet.size >= maxSelections) return prev;
        newSet.add(id);
      }
      return newSet;
    });
  }, [multiSelect, maxSelections]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  return { selectedIds, isSelected, toggleSelection, select, deselect, clearSelection, selectionCount };
}
