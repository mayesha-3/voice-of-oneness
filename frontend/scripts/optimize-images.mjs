#!/usr/bin/env node
/**
 * optimize-images.mjs
 *
 * Reusable image optimization script for the Voice of Oneness website.
 * Compresses and resizes images IN-PLACE in public/pictures/.
 *
 * Usage:
 *   npm run optimize-images            # Process all images
 *   npm run optimize-images -- --dry-run  # Preview changes without modifying files
 *
 * Sizing rules (based on filename patterns):
 *   - banner_*        → max 1920px wide, quality 80
 *   - finale_*        → max 800px wide,  quality 80
 *   - 20XX_1st/2nd/3rd → max 400px wide,  quality 80  (winner portraits)
 *   - sample*         → max 400px wide,  quality 80
 *   - *.png (logos)   → max 200px wide,  quality 80  (kept as PNG)
 *   - everything else → max 800px wide,  quality 80
 *
 * Notes:
 *   - Skips .avif and .svg files
 *   - Won't enlarge images smaller than the target width
 *   - Overwrites originals (back up first if needed)
 */

import { readdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PICTURES_DIR = join(__dirname, "..", "public", "pictures");

const DRY_RUN = process.argv.includes("--dry-run");

// ── Sizing rules ──────────────────────────────────────────────────────────
function getMaxWidth(filename) {
  const lower = filename.toLowerCase();

  if (lower.startsWith("banner_")) return 1920;
  if (lower.startsWith("finale_")) return 800;
  if (/^\d{4}_/.test(lower)) return 400; // e.g. 2024_1st.jpg, 2025_2nd.jpg
  if (lower.startsWith("sample")) return 400;
  if (lower.endsWith(".png")) return 200; // logos
  return 800;
}

const SKIP_EXTENSIONS = new Set([".avif", ".svg"]);

// ── Helpers ───────────────────────────────────────────────────────────────
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function percentSaved(before, after) {
  if (before === 0) return "0%";
  return `${(((before - after) / before) * 100).toFixed(1)}%`;
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log("");
  console.log(
    DRY_RUN
      ? "🔍  DRY RUN — showing what would happen (no files modified)"
      : "🚀  Optimizing images in public/pictures/",
  );
  console.log("─".repeat(64));

  const files = await readdir(PICTURES_DIR);
  const imageFiles = files.filter((f) => {
    const ext = extname(f).toLowerCase();
    return !SKIP_EXTENSIONS.has(ext) && [".jpg", ".jpeg", ".png"].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log("No processable images found.");
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  let skipped = 0;

  for (const file of imageFiles) {
    const filePath = join(PICTURES_DIR, file);
    const ext = extname(file).toLowerCase();
    const maxWidth = getMaxWidth(file);
    const beforeStat = await stat(filePath);
    const beforeSize = beforeStat.size;
    totalBefore += beforeSize;

    try {
      // Read file into buffer first to avoid Windows file locking issues
      const { readFile, writeFile } = await import("node:fs/promises");
      const inputBuffer = await readFile(filePath);

      const metadata = await sharp(inputBuffer).metadata();

      // Don't enlarge images that are already smaller than target
      const needsResize = metadata.width && metadata.width > maxWidth;

      let pipeline = sharp(inputBuffer);

      if (needsResize) {
        pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
      }

      // Apply format-specific compression
      if (ext === ".png") {
        pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
      } else {
        // .jpg / .jpeg
        pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
      }

      const outputBuffer = await pipeline.toBuffer();
      const afterSize = outputBuffer.length;
      totalAfter += afterSize;

      if (DRY_RUN) {
        console.log(
          `  ${file.padEnd(30)} ${formatBytes(beforeSize).padStart(10)} → ${formatBytes(afterSize).padStart(10)}  (${percentSaved(beforeSize, afterSize)} saved)${needsResize ? `  [resize: ${metadata.width}→${maxWidth}px]` : ""}`,
        );
        processed++;
      } else {
        // Only write if we actually saved space
        if (afterSize < beforeSize) {
          await writeFile(filePath, outputBuffer);

          console.log(
            `  ✅ ${file.padEnd(28)} ${formatBytes(beforeSize).padStart(10)} → ${formatBytes(afterSize).padStart(10)}  (${percentSaved(beforeSize, afterSize)} saved)${needsResize ? `  [resize: ${metadata.width}→${maxWidth}px]` : ""}`,
          );
          processed++;
        } else {
          console.log(
            `  ⏭️  ${file.padEnd(28)} ${formatBytes(beforeSize).padStart(10)} — already optimal`,
          );
          totalAfter = totalAfter - afterSize + beforeSize; // correct the total
          skipped++;
        }
      }
    } catch (err) {
      console.error(`  ❌ ${file}: ${err.message}`);
      totalAfter += beforeSize;
      skipped++;
    }
  }

  console.log("─".repeat(64));
  console.log(
    `  ${DRY_RUN ? "Would process" : "Processed"}: ${processed} files${skipped > 0 ? `, skipped: ${skipped}` : ""}`,
  );
  console.log(
    `  Total:  ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)}  (${percentSaved(totalBefore, totalAfter)} saved)`,
  );
  console.log("");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
