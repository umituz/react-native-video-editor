# @umituz/react-native-video-editor

Professional video editor package with layer-based timeline, multiple layer types, and export functionality.

## Features

- Layer-based editing system (text, image, shape, audio, animation)
- Timeline management with scenes
- Playback controls
- History/undo functionality
- Video export with customizable settings
- Bottom sheet integration for layer editing

## Installation

```bash
npm install @umituz/react-native-video-editor
```

## Peer Dependencies

This package requires the following peer dependencies:

```json
{
  "react": ">=18.2.0",
  "react-native": ">=0.74.0",
  "@umituz/react-native-design-system": ">=1.0.0",
  "zustand": ">=4.0.0"
}
```

## Usage

### Hooks

```typescript
import {
  useEditorLayers,
  useEditorScenes,
  useEditorPlayback,
  useEditorHistory,
  useEditorBottomSheet,
  useEditorActions,
} from "@umituz/react-native-video-editor";

// Use hooks in your component
const { layers, addLayer, removeLayer } = useEditorLayers();
const { scenes, addScene, removeScene } = useEditorScenes();
const { isPlaying, play, pause } = useEditorPlayback();
```

### Components

```typescript
import {
  EditorHeader,
  EditorPreviewArea,
  EditorTimeline,
  EditorToolPanel,
  TextLayerEditor,
  ImageLayerEditor,
  ShapeLayerEditor,
  AudioEditor,
  AnimationEditor,
  ExportDialog,
} from "@umituz/react-native-video-editor";

// Use components in your editor screen
<EditorHeader />
<EditorPreviewArea />
<EditorTimeline />
```

### Services

```typescript
import {
  layerOperationsService,
  sceneOperationsService,
  exportOrchestratorService,
} from "@umituz/react-native-video-editor";

// Use services for business logic
layerOperationsService.duplicateLayer(layerId);
sceneOperationsService.addScene(sceneData);
exportOrchestratorService.exportVideo(options);
```

## License

MIT
