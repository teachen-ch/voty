import { PrismaClient, Attachment } from "@prisma/client";
import { IncomingForm, File, Fields, Files } from "formidable";
import { getSessionUser, getShortname } from "graphql/resolvers/users";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "util/logger";

export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_UPLOAD_MB = 30;
const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER || "uploads/";
const prisma = new PrismaClient();

export default async function uploadApi(
  req: NextApiRequest,
  res: NextApiResponse<{
    success?: boolean;
    error?: string;
    files?: Record<string, File>;
    attachments?: Record<string, Attachment>;
  }>
): Promise<void> {
  try {
    const user = getSessionUser(req);

    if (!user) {
      return res.send({ error: "Error.NoPermision" });
    }

    const { fields, files: inFiles } = await formParse(req);
    const card = fields.card?.[0];
    const teamField = fields.team?.[0];
    const discussion = fields.discussion?.[0];

    const attachments: Record<string, Attachment> = {};
    const files: Record<string, File> = {};
    for (const fieldname in inFiles) {
      const file = inFiles[fieldname]?.[0];
      if (!file) continue;
      const path = file.filepath.replace(UPLOAD_FOLDER, "");
      const attachment = await prisma.attachment.create({
        data: {
          file: path,
          card,
          title: file.originalFilename ?? undefined,
          type: file.mimetype ?? undefined,
          discussion: discussion ? { connect: { id: discussion } } : undefined,
          team: { connect: { id: user.teamId || teamField } },
          user: { connect: { id: user.id } },
          school: user.schoolId
            ? { connect: { id: user.schoolId } }
            : undefined,
        },
        include: {
          user: {
            select: { id: true, lastname: true, name: true, role: true },
          },
        },
      });
      // @ts-ignore we are not in graphql, where shortname is calcuated automatically
      attachment.user.shortname = getShortname(attachment.user);
      files[attachment.id] = file;
      attachments[attachment.id] = attachment;
    }
    res.send({ success: true, files, attachments });
  } catch (err) {
    console.error(err);
    logger.error(String(err));
    res.send({ error: "Error.ServerError" });
    res.end();
  }
}

function formParse(
  req: NextApiRequest
): Promise<{ fields: Fields; files: Files }> {
  return new Promise(function (resolve, reject) {
    const form = new IncomingForm({
      uploadDir: UPLOAD_FOLDER,
      keepExtensions: true,
      maxFileSize: MAX_UPLOAD_MB * 1024 * 1024,
    });
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/msword",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "audio/mpeg",
  "video/mp4",
  "video/quicktime",
  "video/mpeg",
  "audio/m4b",
  "audio/mp4",
  "video/3gpp",
  "video/3gpp2",
  "video/x-flv",
  "video/h261",
  "video/h263",
  "video/h264",
  "video/jpeg",
  "image/pjpeg",
  "video/x-m4v",
  "video/x-ms-asf",
  "video/x-ms-wm",
  "audio/flac",
  "image/heif",
  "image/heif",
  "image/heic",
  "image/heic-sequence",
  "image/avif",
  "image/avif-sequence",
];
