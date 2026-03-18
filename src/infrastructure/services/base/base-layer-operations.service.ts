/**
 * Base Layer Operations Service
 * Provides common layer operation logic with type safety
 * Eliminates code duplication across layer types
 */

import type { Scene, Layer, LayerOperationResult } from "../../../domain/entities/video-project.types";

/**
 * Abstract base class for layer operations
 * Implements template method pattern for layer-specific operations
 */
export abstract class BaseLayerOperationsService<T extends Layer> {
  /**
   * Create a new layer instance (layer-specific)
   */
  protected abstract createLayer(data: unknown): T;

  /**
   * Validate layer data before creation (layer-specific)
   */
  protected abstract validateLayerData(data: unknown): string | null;

  /**
   * Get the layer type for type checking
   */
  protected abstract getLayerType(): T["type"];

  /**
   * Add layer to scene
   */
  addLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerData: unknown,
  ): LayerOperationResult {
    try {
      const validationError = this.validateSceneIndex(scenes, sceneIndex);
      if (validationError) {
        return {
          success: false,
          updatedScenes: scenes,
          error: validationError,
        };
      }

      const dataValidationError = this.validateLayerData(layerData);
      if (dataValidationError) {
        return {
          success: false,
          updatedScenes: scenes,
          error: dataValidationError,
        };
      }

      const newLayer = this.createLayer(layerData);
      const updatedScenes = this.addLayerToScene(scenes, sceneIndex, newLayer);

      return { success: true, updatedScenes };
    } catch (error) {
      return {
        success: false,
        updatedScenes: scenes,
        error: error instanceof Error ? error.message : "Failed to add layer",
      };
    }
  }

  /**
   * Edit existing layer
   */
  editLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
    layerData: Partial<T>,
  ): LayerOperationResult {
    try {
      const validationError = this.validateSceneIndex(scenes, sceneIndex);
      if (validationError) {
        return {
          success: false,
          updatedScenes: scenes,
          error: validationError,
        };
      }

      const layerResult = this.findLayer(scenes, sceneIndex, layerId);
      if (!layerResult) {
        return {
          success: false,
          updatedScenes: scenes,
          error: "Layer not found",
        };
      }

      const typeError = this.validateLayerType(layerResult.layer);
      if (typeError) {
        return {
          success: false,
          updatedScenes: scenes,
          error: typeError,
        };
      }

      const updatedScenes = this.updateLayerInScene(
        scenes,
        sceneIndex,
        layerResult.index,
        layerData,
      );

      return { success: true, updatedScenes };
    } catch (error) {
      return {
        success: false,
        updatedScenes: scenes,
        error: error instanceof Error ? error.message : "Failed to edit layer",
      };
    }
  }

  /**
   * Validate scene index
   */
  protected validateSceneIndex(
    scenes: Scene[],
    sceneIndex: number,
  ): string | null {
    if (sceneIndex < 0 || sceneIndex >= scenes.length) {
      return "Invalid scene index";
    }
    return null;
  }

  /**
   * Find layer by ID
   */
  protected findLayer(
    scenes: Scene[],
    sceneIndex: number,
    layerId: string,
  ): { layer: Layer; index: number } | null {
    const layerIndex = scenes[sceneIndex].layers.findIndex(
      (l) => l.id === layerId,
    );

    if (layerIndex === -1) {
      return null;
    }

    return {
      layer: scenes[sceneIndex].layers[layerIndex],
      index: layerIndex,
    };
  }

  /**
   * Validate layer type matches service type
   */
  protected validateLayerType(layer: Layer): string | null {
    if (layer.type !== this.getLayerType()) {
      return `Layer is not a ${this.getLayerType()} layer`;
    }
    return null;
  }

  /**
   * Add layer to scene (immutable update)
   */
  protected addLayerToScene(
    scenes: Scene[],
    sceneIndex: number,
    layer: T,
  ): Scene[] {
    const updatedScenes = [...scenes];
    updatedScenes[sceneIndex] = {
      ...updatedScenes[sceneIndex],
      layers: [...updatedScenes[sceneIndex].layers, layer],
    };
    return updatedScenes;
  }

  /**
   * Update layer in scene (immutable update)
   */
  protected updateLayerInScene(
    scenes: Scene[],
    sceneIndex: number,
    layerIndex: number,
    layerData: Partial<T>,
  ): Scene[] {
    const updatedScenes = [...scenes];
    const existingLayer = updatedScenes[sceneIndex].layers[layerIndex];
    updatedScenes[sceneIndex].layers[layerIndex] = {
      ...existingLayer,
      ...layerData,
    };
    return updatedScenes;
  }
}
