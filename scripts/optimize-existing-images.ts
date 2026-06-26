import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import sharp from "sharp";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function optimizeImage(
  buffer: Buffer,
  contentType: string
): Promise<{ data: Buffer; contentType: string } | null> {
  if (
    !contentType.startsWith("image/") ||
    contentType.includes("svg") ||
    contentType.includes("gif")
  ) {
    return null;
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

    const optimizedBuffer = await pipeline
      .webp({ quality: 75 })
      .toBuffer();

    return {
      data: optimizedBuffer,
      contentType: "image/webp",
    };
  } catch (error) {
    console.error("Error processing image with sharp:", error);
    return null;
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  console.log("Fetching all uploaded files from Postgres...");
  const uploads = await prisma.upload.findMany();

  let optimizedCount = 0;
  let totalSavedBytes = 0;

  for (const upload of uploads) {
    const isImage = upload.contentType.startsWith("image/");
    const isVectorOrGif =
      upload.contentType.includes("svg") ||
      upload.contentType.includes("gif");

    if (!isImage || isVectorOrGif) {
      console.log(`- Skipping non-optimizable file: ${upload.filename} (${upload.contentType})`);
      continue;
    }

    const originalSize = upload.data.length;
    console.log(`Processing image: ${upload.filename} (${formatSize(originalSize)})...`);

    const result = await optimizeImage(Buffer.from(upload.data), upload.contentType);
    if (!result) {
      console.log(`  - sharp skipped or failed for ${upload.filename}`);
      continue;
    }

    const optimizedSize = result.data.length;

    // Only update if it actually saved space
    if (optimizedSize < originalSize) {
      const savedBytes = originalSize - optimizedSize;
      totalSavedBytes += savedBytes;
      optimizedCount++;

      // Adjust filename extension to .webp if converting format
      let newFilename = upload.filename;
      if (
        result.contentType === "image/webp" &&
        !newFilename.toLowerCase().endsWith(".webp")
      ) {
        const extIndex = newFilename.lastIndexOf(".");
        if (extIndex !== -1) {
          newFilename = newFilename.substring(0, extIndex) + ".webp";
        } else {
          newFilename = newFilename + ".webp";
        }
      }

      await prisma.upload.update({
        where: { id: upload.id },
        data: {
          data: result.data,
          contentType: result.contentType,
          filename: newFilename,
        },
      });

      console.log(
        `  ✅ Optimized to WebP: ${formatSize(originalSize)} ➔ ${formatSize(
          optimizedSize
        )} (${((savedBytes / originalSize) * 100).toFixed(1)}% savings)`
      );
    } else {
      console.log(`  - Skipping: Optimized size is not smaller than original.`);
    }
  }

  console.log(`\n🎉 Optimization run complete!`);
  console.log(`- Total images updated: ${optimizedCount}`);
  console.log(`- Total disk space saved: ${formatSize(totalSavedBytes)}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Optimization script failed:");
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
