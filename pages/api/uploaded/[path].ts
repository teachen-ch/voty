import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "util/logger";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { allowedTypes } from "../upload";
import { uploadPath } from "util/uploads";

const prisma = new PrismaClient();

function isInlineType(type?: string | null): boolean {
  if (!type || !allowedTypes.includes(type)) return false;
  return /^(image|video|audio)\//.test(type) || type === "application/pdf";
}

export default async function uploadedApi(
  req: NextApiRequest,
  res: NextApiResponse<{
    success?: boolean;
    error?: string;
  }>
): Promise<void> {
  try {
    const file = path.basename(String(req.query.path ?? ""));
    if (!file) return res.send({ error: "Error.MissingParameter" });

    const attachment = await prisma.attachment.findUnique({ where: { file } });
    if (!attachment) return res.send({ error: "Error.NotFound" });

    const full = uploadPath(file);
    if (!fs.existsSync(full)) return res.send({ error: "Error.NotFound" });
    const stream = fs.createReadStream(full);

    res.setHeader("X-Content-Type-Options", "nosniff");
    if (isInlineType(attachment.type)) {
      res.setHeader("Content-Type", attachment.type as string);
    } else {
      const name = encodeURIComponent(attachment.title ?? file);
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Content-Disposition", `attachment; filename*=UTF-8''${name}`);
    }
    stream.pipe(res);
    stream.on("end", () => res.end());
  } catch (err) {
    console.error(err);
    logger.error(String(err));
    res.send({ error: "Error.ServerError" });
  }
}
