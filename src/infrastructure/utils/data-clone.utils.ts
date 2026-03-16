/**
 * Data Clone Utilities
 * Optimized deep cloning functions for video editor data structures
 */

import type { Scene, VideoProject, Layer } from "../../domain/entities/video-project.types";

/**
 * Optimized deep clone for VideoProject
 * Uses structured clone if available, falls back to manual clone
 */
export function cloneVideoProject(project: VideoProject): VideoProject {
  // Use structured clone for better performance if available
  if (typeof structuredClone !== 'undefined') {
    return structuredClone(project);
  }

  // Manual clone fallback - only clone what's necessary
  return {
    ...project,
    scenes: project.scenes.map((scene: Scene) => ({
      ...scene,
      layers: scene.layers.map((layer: Layer) => ({ ...layer })),
    })),
  };
}

/**
 * Optimized deep clone for Scene
 */
export function cloneScene(scene: Scene): Scene {
  if (typeof structuredClone !== 'undefined') {
    return structuredClone(scene);
  }

  return {
    ...scene,
    layers: scene.layers.map((layer: Layer) => ({ ...layer })),
  };
}

/**
 * Optimized shallow clone for Layer
 * Layer objects are already immutable in our architecture
 */
export function cloneLayer(layer: Layer): Layer {
  return { ...layer };
}

/**
 * Clone multiple layers
 */
export function cloneLayers(layers: Layer[]): Layer[] {
  return layers.map((layer: Layer) => ({ ...layer }));
}

/**
 * Clone scene with new ID (for duplication)
 */
export function cloneSceneWithNewId(scene: Scene, generateId: () => string): Scene {
  return {
    ...scene,
    id: generateId(),
    layers: scene.layers.map((layer: Layer) => ({
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
 * Optimized clone for Audio configuration
 */
export function cloneAudio(audio: Scene["audio"]): Scene["audio"] {
  if (!audio) return audio;
  return { ...audio };
}

/**
 * Optimized clone for Background configuration
 */
export function cloneBackground(background: Scene["background"]): Scene["background"] {
  return { ...background };
}

/**
 * Optimized clone for Transition configuration
 */
export function cloneTransition(transition: Scene["transition"]): Scene["transition"] {
  return { ...transition };
}

/**
 * Create a safe copy of an array (shallow clone)
 */
export function cloneArray<T>(array: T[]): T[] {
  return [...array];
}

/**
 * Safe array slice that handles edge cases
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
