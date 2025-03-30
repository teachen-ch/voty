import { PrismaClient, Role } from "@prisma/client";
import { promises as fs } from "fs";
import { getSessionUser } from "graphql/resolvers/users";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "util/logger";
import path from "path";

const prisma = new PrismaClient();
const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER || "uploads/";

export default async function deleteApi(
  req: NextApiRequest,
  res: NextApiResponse<{
    success?: boolean;
    error?: string;
  }>
): Promise<void> {
  try {
    const user = getSessionUser(req);
    const fields = JSON.parse(req.body) as Record<string, string>;
    const { id } = fields;

    if (!user) return res.send({ error: "Error.NoPermision" });
    if (!id) return res.send({ error: "Error.MissingParameter" });

    const attachment = await prisma.attachment.findUnique({ where: { id } });
    if (!attachment) return res.send({ error: "Error.NotFound" });
    if (attachment.userId !== user.id && user.role === Role.Student)
      return res.send({ error: "Error.NoPermission" });

    if (attachment.schoolId !== user.schoolId && user.role !== Role.Admin)
      return res.send({ error: "Error.NoPermission" });

    await prisma.attachment.delete({ where: { id } });
    await fs.rm(path.join(UPLOAD_FOLDER, attachment.file));
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    logger.error(String(err));
    res.send({ error: "Error.ServerError" });
  }
}
