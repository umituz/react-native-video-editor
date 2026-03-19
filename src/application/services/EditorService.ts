/**
 * Editor Service
 * Single Responsibility: High-level editor operations coordination
 * Application Service Layer
 *
 * Orchestrates multiple use cases and domain operations
 */

import type { VideoProject, Scene, Layer } from "../../domain/entities/video-project.types";
import type {
  CreateLayerRequest,
  UpdateLayerRequest,
  DeleteLayerRequest,
} from "../usecases/LayerUseCases";
import {
  CreateLayerUseCase,
  UpdateLayerUseCase,
  DeleteLayerUseCase,
  DuplicateLayerUseCase,
  ReorderLayerUseCase,
} from "../usecases/LayerUseCases";
import type { LayerRepository } from "../usecases/LayerUseCases";

export interface EditorServiceConfig {
  layerRepository: LayerRepository;
}

/**
 * Application service that coordinates editor operations
 * Provides high-level API for the presentation layer
 */
export class EditorService {
  private readonly createLayerUseCase: CreateLayerUseCase;
  private readonly updateLayerUseCase: UpdateLayerUseCase;
  private readonly deleteLayerUseCase: DeleteLayerUseCase;
  private readonly duplicateLayerUseCase: DuplicateLayerUseCase;
  private readonly reorderLayerUseCase: ReorderLayerUseCase;

  constructor(config: EditorServiceConfig) {
    this.createLayerUseCase = new CreateLayerUseCase(config.layerRepository);
    this.updateLayerUseCase = new UpdateLayerUseCase(config.layerRepository);
    this.deleteLayerUseCase = new DeleteLayerUseCase(config.layerRepository);
    this.duplicateLayerUseCase = new DuplicateLayerUseCase(config.layerRepository);
    this.reorderLayerUseCase = new ReorderLayerUseCase(config.layerRepository);
  }

  // Layer Operations
  async createLayer(request: CreateLayerRequest): Promise<Layer> {
    return await this.createLayerUseCase.execute(request);
  }

  async updateLayer(request: UpdateLayerRequest): Promise<void> {
    await this.updateLayerUseCase.execute(request);
  }

  async deleteLayer(request: DeleteLayerRequest): Promise<void> {
    await this.deleteLayerUseCase.execute(request);
  }

  async duplicateLayer(sceneId: string, layerId: string): Promise<Layer> {
    return await this.duplicateLayerUseCase.execute(sceneId, layerId);
  }

  async reorderLayer(
    sceneId: string,
    layerId: string,
    direction: "front" | "back" | "up" | "down",
  ): Promise<void> {
    await this.reorderLayerUseCase.execute(sceneId, layerId, direction);
  }

  // Batch Operations
  async batchUpdateLayers(
    sceneId: string,
    updates: Array<{ layerId: string; changes: Partial<Layer> }>,
  ): Promise<void> {
    for (const { layerId, changes } of updates) {
      await this.updateLayer({ sceneId, layerId, updates: changes });
    }
  }

  async duplicateMultipleLayers(
    sceneId: string,
    layerIds: string[],
  ): Promise<Layer[]> {
    const duplicated: Layer[] = [];

    for (const layerId of layerIds) {
      const layer = await this.duplicateLayer(sceneId, layerId);
      duplicated.push(layer);
    }

    return duplicated;
  }

  async deleteMultipleLayers(sceneId: string, layerIds: string[]): Promise<void> {
    for (const layerId of layerIds) {
      await this.deleteLayer({ sceneId, layerId });
    }
  }

  // Query Operations
  getLayersByScene(scenes: Scene[], sceneId: string): Layer[] {
    const scene = scenes.find((s) => s.id === sceneId);
    return scene?.layers || [];
  }

  getLayersByType(scenes: Scene[], type: Layer["type"]): Layer[] {
    const allLayers = scenes.flatMap((s) => s.layers);
    return allLayers.filter((l) => l.type === type);
  }

  getLayerById(scenes: Scene[], layerId: string): Layer | undefined {
    for (const scene of scenes) {
      const layer = scene.layers.find((l) => l.id === layerId);
      if (layer) return layer;
    }
    return undefined;
  }

  // Validation
  validateLayer(layer: Partial<Layer>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!layer.type) {
      errors.push("Layer type is required");
    }

    if (layer.type === "image" && !(layer as any).uri) {
      errors.push("Image layer requires URI");
    }

    if (layer.type === "text" && !(layer as any).content) {
      errors.push("Text layer requires content");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  // Export Helpers
  prepareProjectForExport(project: VideoProject): VideoProject {
    // Clean up temporary data
    // Optimize images
    // Validate all layers
    // Return export-ready project
    return project;
  }
}
