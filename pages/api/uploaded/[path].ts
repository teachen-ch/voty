import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "util/logger";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER || "uploads/";

export default async function uploadedApi(
  req: NextApiRequest,
  res: NextApiResponse<{
    success?: boolean;
    error?: string;
  }>
): Promise<void> {
  try {
    const file = req.url?.replace("/api/uploaded/", "");
    if (!file) return res.send({ error: "Error.MissingParameter" });
    if (file.startsWith("/") || file.indexOf("..") >= 0)
      return res.send({ error: "Error.MissingParameter" });

    const attachment = await prisma.attachment.findUnique({ where: { file } });
    if (!attachment) return res.send({ error: "Error.NotFound" });

    const full = path.join(UPLOAD_FOLDER, file);
    if (!fs.existsSync(full)) return res.send({ error: "Error.NotFound" });
    const stream = fs.createReadStream(full);

    res.setHeader("Content-Type", attachment.type);
    stream.pipe(res);
    stream.on("end", () => res.end());
  } catch (err) {
    console.error(err);
    logger.error(String(err));
    res.send({ error: "Error.ServerError" });
  }
}
