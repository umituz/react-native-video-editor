/**
 * Layer Use Cases
 * Single Responsibility: Layer business logic orchestration
 * Domain-Driven Design: Application Layer
 *
 * This layer orchestrates domain operations and coordinates between entities.
 * It doesn't contain business logic, but coordinates domain services.
 */

import type { Layer, ImageLayer, TextLayer, ShapeLayer } from "../../domain/entities/video-project.types";
import type { AddImageLayerData, AddTextLayerData, AddShapeLayerData } from "../../domain/entities/video-project.types";

// Repository Interface (Dependency Inversion)
export interface LayerRepository {
  addLayer(sceneId: string, layer: Layer): Promise<void>;
  updateLayer(sceneId: string, layerId: string, updates: Partial<Layer>): Promise<void>;
  deleteLayer(sceneId: string, layerId: string): Promise<void>;
  duplicateLayer(sceneId: string, layerId: string): Promise<Layer>;
  reorderLayer(sceneId: string, layerId: string, direction: "front" | "back" | "up" | "down"): Promise<void>;
}

// Request/Response DTOs
export interface CreateLayerRequest {
  sceneId: string;
  layerType: "image" | "text" | "shape" | "video";
  data: AddImageLayerData | AddTextLayerData | AddShapeLayerData;
}

export interface UpdateLayerRequest {
  sceneId: string;
  layerId: string;
  updates: Partial<Layer>;
}

export interface DeleteLayerRequest {
  sceneId: string;
  layerId: string;
}

// Use Case: Create Layer
export class CreateLayerUseCase {
  constructor(private readonly layerRepository: LayerRepository) {}

  async execute(request: CreateLayerRequest): Promise<Layer> {
    const { sceneId, layerType, data } = request;

    // Validate request
    if (!sceneId) {
      throw new Error("Scene ID is required");
    }

    // Create layer through domain service
    const layer = this.createLayerByType(layerType, data);

    // Persist through repository
    await this.layerRepository.addLayer(sceneId, layer);

    return layer;
  }

  private createLayerByType(
    type: string,
    data: AddImageLayerData | AddTextLayerData | AddShapeLayerData,
  ): Layer {
    switch (type) {
      case "image":
        return this.createImageLayer(data as AddImageLayerData);
      case "text":
        return this.createTextLayer(data as AddTextLayerData);
      case "shape":
        return this.createShapeLayer(data as AddShapeLayerData);
      default:
        throw new Error(`Unsupported layer type: ${type}`);
    }
  }

  private createImageLayer(data: AddImageLayerData): ImageLayer {
    return {
      id: this.generateId(),
      type: "image",
      uri: data.uri || "",
      position: { x: 15, y: 30 },
      size: { width: 70, height: 40 },
      rotation: 0,
      opacity: data.opacity ?? 1,
    };
  }

  private createTextLayer(data: AddTextLayerData): TextLayer {
    return {
      id: this.generateId(),
      type: "text",
      content: data.content || "",
      position: { x: 10, y: 40 },
      size: { width: 80, height: 20 },
      rotation: 0,
      opacity: 1,
      fontSize: data.fontSize || 48,
      fontFamily: data.fontFamily || "System",
      fontWeight: (data.fontWeight as TextLayer["fontWeight"]) || "bold",
      color: data.color || "#000000",
      textAlign: data.textAlign || "center",
    };
  }

  private createShapeLayer(data: AddShapeLayerData): ShapeLayer {
    return {
      id: this.generateId(),
      type: "shape",
      shape: (data.shape as ShapeLayer["shape"]) || "rectangle",
      position: { x: 25, y: 25 },
      size: { width: 50, height: 50 },
      rotation: 0,
      opacity: data.opacity ?? 1,
      fillColor: data.fillColor || "#000000",
      borderColor: data.borderColor,
      borderWidth: data.borderWidth,
    };
  }

  private generateId(): string {
    return `layer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Use Case: Update Layer
export class UpdateLayerUseCase {
  constructor(private readonly layerRepository: LayerRepository) {}

  async execute(request: UpdateLayerRequest): Promise<void> {
    const { sceneId, layerId, updates } = request;

    // Validate
    if (!sceneId || !layerId) {
      throw new Error("Scene ID and Layer ID are required");
    }

    // Persist through repository
    await this.layerRepository.updateLayer(sceneId, layerId, updates);
  }
}

// Use Case: Delete Layer
export class DeleteLayerUseCase {
  constructor(private readonly layerRepository: LayerRepository) {}

  async execute(request: DeleteLayerRequest): Promise<void> {
    const { sceneId, layerId } = request;

    // Validate
    if (!sceneId || !layerId) {
      throw new Error("Scene ID and Layer ID are required");
    }

    // Persist through repository
    await this.layerRepository.deleteLayer(sceneId, layerId);
  }
}

// Use Case: Duplicate Layer
export class DuplicateLayerUseCase {
  constructor(private readonly layerRepository: LayerRepository) {}

  async execute(sceneId: string, layerId: string): Promise<Layer> {
    // Validate
    if (!sceneId || !layerId) {
      throw new Error("Scene ID and Layer ID are required");
    }

    // Persist through repository
    return await this.layerRepository.duplicateLayer(sceneId, layerId);
  }
}

// Use Case: Reorder Layer
export class ReorderLayerUseCase {
  constructor(private readonly layerRepository: LayerRepository) {}

  async execute(
    sceneId: string,
    layerId: string,
    direction: "front" | "back" | "up" | "down",
  ): Promise<void> {
    // Validate
    if (!sceneId || !layerId) {
      throw new Error("Scene ID and Layer ID are required");
    }

    // Persist through repository
    await this.layerRepository.reorderLayer(sceneId, layerId, direction);
  }
}
