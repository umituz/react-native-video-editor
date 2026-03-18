---
name: setup-react-native-video-editor
description: Sets up professional video editing for React Native apps with layer-based timeline, text/image/shape/audio/animation layers, and export functionality. Triggers on: Setup video editor, video editing, timeline editor, video layers, video export, useVideoEditor, useEditorLayers, video composition.
---

# Setup React Native Video Editor

Comprehensive setup for `@umituz/react-native-video-editor` - Professional video editing with layers.

## Overview

This skill handles video editing integration:
- Package installation
- Layer-based timeline
- Text/image/shape/audio layers
- Animation support
- Export functionality

## Quick Start

Say: **"Setup video editor in my app"**

## Step 1: Install

```bash
npm install @umituz/react-native-video-editor@latest
npm install @umituz/react-native-design-system
npm install expo-video
```

## Step 2: Use Video Editor

```typescript
import { VideoEditor, useEditorLayers, useEditorScenes } from '@umituz/react-native-video-editor';

export function VideoEditScreen() {
  const { layers, addLayer, removeLayer } = useEditorLayers();
  const { scenes, activeScene } = useEditorScenes();

  return (
    <VideoEditor
      videoUri={videoUri}
      layers={layers}
      activeScene={activeScene}
      onLayerAdd={addLayer}
      onLayerRemove={removeLayer}
      onExport={handleExport}
    />
  );
}
```

## Layer Types

- **Text layers** - Add titles, captions
- **Image layers** - Overlay images
- **Shape layers** - Rectangles, circles
- **Audio layers** - Background music, sound effects
- **Animation** - Fade in/out, transitions

## Features

- **Timeline** - Multi-track editing
- **Layers** - Add/remove/edit layers
- **Preview** - Real-time preview
- **Export** - Various resolutions

## Verification

- ✅ Package installed
- ✅ Timeline renders
- ✅ Layers work
- ✅ Export saves video

---

**Compatible with:** @umituz/react-native-video-editor@latest
**Platforms:** React Native (Expo & Bare)
