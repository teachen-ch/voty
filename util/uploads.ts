import path from "path";

/** Absolute path of the uploads folder (bind-mounted in docker). */
export const UPLOAD_DIR = path.join(process.cwd(), "uploads");

/**
 * Absolute path of an uploaded file. The folder must stay a literal so
 * Turbopack can scope output file tracing to uploads/ instead of tracing the
 * whole project.
 */
export function uploadPath(file: string): string {
  return path.join(process.cwd(), "uploads", path.basename(file));
}
