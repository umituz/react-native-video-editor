/**
 * Image Processing Utilities
 * PERFORMANCE: Optimizes image handling for memory efficiency
 * NOTE: Requires expo-image-manipulator package (graceful degradation if not installed)
 */

let ImageManipulator: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ImageManipulator = require('expo-image-manipulator');
} catch {
  ImageManipulator = null;
}

export async function resizeImage(uri: string, maxWidth: number = 1024, maxHeight: number = 1024): Promise<string> {
  if (!ImageManipulator) return uri;
  try {
    const result = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: maxWidth, height: maxHeight } }], { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG });
    return result.uri;
  } catch (error) {
    console.warn('Image resize failed:', error);
    return uri;
  }
}

export async function generateThumbnail(uri: string, size: number = 200): Promise<string> {
  if (!ImageManipulator) return uri;
  try {
    const result = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: size, height: size } }], { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG });
    return result.uri;
  } catch (error) {
    console.warn('Thumbnail generation failed:', error);
    return uri;
  }
}

export async function compressImage(uri: string, quality: number = 0.8): Promise<string> {
  if (!ImageManipulator) return uri;
  try {
    const result = await ImageManipulator.manipulateAsync(uri, [], { compress: quality, format: ImageManipulator.SaveFormat.JPEG });
    return result.uri;
  } catch (error) {
    console.warn('Image compression failed:', error);
    return uri;
  }
}

export async function getImageDimensions(uri: string): Promise<{ width: number; height: number } | null> {
  if (!ImageManipulator) return null;
  try {
    const result = await ImageManipulator.manipulateAsync(uri, [], { compress: 1, format: ImageManipulator.SaveFormat.JPEG });
    return { width: result.width, height: result.height };
  } catch (error) {
    console.warn('Failed to get image dimensions:', error);
    return null;
  }
}

export async function optimizeImageForEditor(uri: string): Promise<string> {
  const MAX_DIMENSION = 1920;
  if (!ImageManipulator) return uri;
  try {
    const dimensions = await getImageDimensions(uri);
    if (!dimensions) return uri;
    if (dimensions.width > MAX_DIMENSION || dimensions.height > MAX_DIMENSION) {
      return await resizeImage(uri, MAX_DIMENSION, MAX_DIMENSION);
    }
    return await compressImage(uri, 0.85);
  } catch (error) {
    console.warn('Image optimization failed:', error);
    return uri;
  }
}
