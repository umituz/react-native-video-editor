/**
 * Layer Repository Implementation
 * Single Responsibility: Persist layer data
 * Infrastructure Layer
 *
 * Implements the LayerRepository interface from the application layer.
 * Handles data persistence and retrieval.
 */

import type { Layer, Scene } from "../../domain/entities/video-project.types";
import type { LayerRepository } from "../../application/usecases/LayerUseCases";

/**
 * In-memory implementation of LayerRepository
 * In production, this would connect to a database, API, or state management
 */
export class LayerRepositoryImpl implements LayerRepository {
  constructor(
    private readonly getScenes: () => Scene[],
    private readonly setScenes: (scenes: Scene[]) => void,
  ) {}

  async addLayer(sceneId: string, layer: Layer): Promise<void> {
    const scenes = this.getScenes();
    const sceneIndex = scenes.findIndex((s) => s.id === sceneId);

    if (sceneIndex === -1) {
      throw new Error(`Scene not found: ${sceneId}`);
    }

    scenes[sceneIndex].layers.push(layer);
    this.setScenes([...scenes]);
  }

  async updateLayer(
    sceneId: string,
    layerId: string,
    updates: Partial<Layer>,
  ): Promise<void> {
    const scenes = this.getScenes();
    const sceneIndex = scenes.findIndex((s) => s.id === sceneId);

    if (sceneIndex === -1) {
      throw new Error(`Scene not found: ${sceneId}`);
    }

    const layerIndex = scenes[sceneIndex].layers.findIndex((l) => l.id === layerId);

    if (layerIndex === -1) {
      throw new Error(`Layer not found: ${layerId}`);
    }

    scenes[sceneIndex].layers[layerIndex] = {
      ...scenes[sceneIndex].layers[layerIndex],
      ...updates,
    } as Layer;

    this.setScenes([...scenes]);
  }

  async deleteLayer(sceneId: string, layerId: string): Promise<void> {
    const scenes = this.getScenes();
    const sceneIndex = scenes.findIndex((s) => s.id === sceneId);

    if (sceneIndex === -1) {
      throw new Error(`Scene not found: ${sceneId}`);
    }

    scenes[sceneIndex].layers = scenes[sceneIndex].layers.filter(
      (l) => l.id !== layerId,
    );

    this.setScenes([...scenes]);
  }

  async duplicateLayer(sceneId: string, layerId: string): Promise<Layer> {
    const scenes = this.getScenes();
    const sceneIndex = scenes.findIndex((s) => s.id === sceneId);

    if (sceneIndex === -1) {
      throw new Error(`Scene not found: ${sceneId}`);
    }

    const layer = scenes[sceneIndex].layers.find((l) => l.id === layerId);

    if (!layer) {
      throw new Error(`Layer not found: ${layerId}`);
    }

    const duplicated: Layer = {
      ...layer,
      id: `layer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      position: {
        x: layer.position.x + 5,
        y: layer.position.y + 5,
      },
    };

    scenes[sceneIndex].layers.push(duplicated);
    this.setScenes([...scenes]);

    return duplicated;
  }

  async reorderLayer(
    sceneId: string,
    layerId: string,
    direction: "front" | "back" | "up" | "down",
  ): Promise<void> {
    const scenes = this.getScenes();
    const sceneIndex = scenes.findIndex((s) => s.id === sceneId);

    if (sceneIndex === -1) {
      throw new Error(`Scene not found: ${sceneId}`);
    }

    const layers = scenes[sceneIndex].layers;
    const layerIndex = layers.findIndex((l) => l.id === layerId);

    if (layerIndex === -1) {
      throw new Error(`Layer not found: ${layerId}`);
    }

    const [layer] = layers.splice(layerIndex, 1);

    switch (direction) {
      case "front":
        layers.push(layer);
        break;
      case "back":
        layers.unshift(layer);
        break;
      case "up":
        if (layerIndex < layers.length) {
          layers.splice(layerIndex + 1, 0, layer);
        }
        break;
      case "down":
        if (layerIndex > 0) {
          layers.splice(layerIndex - 1, 0, layer);
        }
        break;
    }

    scenes[sceneIndex].layers = layers;
    this.setScenes([...scenes]);
  }
}

/**
 * Factory function to create repository with state management integration
 */
export function createLayerRepository(
  getScenes: () => Scene[],
  setScenes: (scenes: Scene[]) => void,
): LayerRepository {
  return new LayerRepositoryImpl(getScenes, setScenes);
}
