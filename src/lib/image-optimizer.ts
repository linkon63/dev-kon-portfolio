import sharp from "sharp";

/**
 * Optimizes an image buffer on the server:
 * - Checks if the file is a support raster image type (jpeg, png, webp, etc.)
 * - Resizes the image to a maximum width of 1400px (retaining aspect ratio, without enlargement)
 * - Converts it to WebP format with 75% quality compression
 * - Safe fallback: if sharp throws any error, returns the original buffer and content type.
 */
export async function optimizeImage(
  buffer: Buffer,
  contentType: string
): Promise<{ data: Buffer; contentType: string }> {
  // Only process standard raster images (exclude vector graphics, gifs, etc.)
  if (
    !contentType.startsWith("image/") ||
    contentType.includes("svg") ||
    contentType.includes("gif")
  ) {
    return { data: buffer, contentType };
  }

  try {
    let pipeline = sharp(buffer);
    const metadata = await pipeline.metadata();

    // Scale down width to 1400px max if it exceeds
    if (metadata.width && metadata.width > 1400) {
      pipeline = pipeline.resize({
        width: 1400,
        withoutEnlargement: true,
      });
    }

    // Convert to webp with 75% quality
    const optimizedBuffer = await pipeline
      .webp({ quality: 75 })
      .toBuffer();

    return {
      data: optimizedBuffer,
      contentType: "image/webp",
    };
  } catch (error) {
    console.error("[optimizeImage] Error processing image:", error);
    return { data: buffer, contentType };
  }
}
