/**
 * Data Clone Utilities
 * Optimized deep cloning functions for video editor data structures
 */

import type { Scene, VideoProject, Layer } from "../../domain/entities/video-project.types";

/**
 * Generic deep clone using structured clone or spread operator
 */
export function deepClone<T>(obj: T): T {
  if (typeof structuredClone !== 'undefined') {
    return structuredClone(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }

  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      (acc as Record<string, unknown>)[key] = deepClone((obj as Record<string, unknown>)[key]);
      return acc;
    }, {} as T);
  }

  return obj;
}

/**
 * Optimized deep clone for VideoProject
 */
export function cloneVideoProject(project: VideoProject): VideoProject {
  return deepClone(project);
}

/**
 * Optimized deep clone for Scene
 */
export function cloneScene(scene: Scene): Scene {
  return deepClone(scene);
}

/**
 * Shallow clone for Layer
 */
export function cloneLayer(layer: Layer): Layer {
  return { ...layer };
}

/**
 * Clone multiple layers
 */
export function cloneLayers(layers: Layer[]): Layer[] {
  return layers.map(layer => ({ ...layer }));
}

/**
 * Clone scene with new ID (for duplication)
 */
export function cloneSceneWithNewId(scene: Scene, generateId: () => string): Scene {
  return {
    ...scene,
    id: generateId(),
    layers: scene.layers.map(layer => ({
      ...layer,
      id: generateId(),
    })),
  };
}

/**
 * Clone layer with new ID (for duplication)
 */
export function cloneLayerWithNewId(layer: Layer, generateId: () => string): Layer {
  return {
    ...layer,
    id: generateId(),
  };
}

/**
 * Generic shallow clone for any object
 */
export function shallowClone<T>(obj: T): T {
  if (!obj) return obj;
  if (Array.isArray(obj)) return [...obj] as T;
  return { ...obj } as T;
}

/**
 * Safe array slice
 */
export function safeSlice<T>(
  array: T[],
  start?: number,
  end?: number,
): T[] {
  return array.slice(start, end);
}

/**
 * Check if two values are shallow equal
 */
export function isShallowEqual<T>(a: T, b: T): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if ((a as Record<string, unknown>)[key] !== (b as Record<string, unknown>)[key]) {
      return false;
    }
  }

  return true;
}
