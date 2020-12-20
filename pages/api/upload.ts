import { PrismaClient } from "@prisma/client";
import { IncomingForm, File, Files } from "formidable";
import { getSessionUser } from "graphql/resolvers/users";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "util/logger";

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

function formParse(
  req: NextApiRequest,
  opts?: any
): Promise<{ fields: Record<string, string | string[]>; files: Files }> {
  return new Promise(function (resolve, reject) {
    const form = new IncomingForm(opts);
    form.uploadDir = "./uploads";
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<{
    success?: boolean;
    error?: string;
    attachments?: Record<string, File>;
  }>
): Promise<void> => {
  try {
    const user = getSessionUser(req);

    if (!user) {
      return res.send({ error: "Error.NoPermision" });
    }

    const { fields, files } = await formParse(req);
    if (typeof fields.card === "object") throw new Error("cannot be array");
    if (typeof fields.team === "object") throw new Error("cannot be array");
    if (typeof fields.thread === "object") throw new Error("cannot be array");

    const attachments: Record<string, File> = {};
    for (const fieldname in files) {
      const file = files[fieldname];
      const attachment = await prisma.attachment.create({
        data: {
          file: file.path,
          card: fields.card,
          thread: fields.thread
            ? { connect: { id: fields.thread } }
            : undefined,
          team: { connect: { id: user.teamId || fields.team } },
          user: { connect: { id: user.id } },
          school: user.schoolId
            ? { connect: { id: user.schoolId } }
            : undefined,
        },
      });
      attachments[attachment.id] = file;
    }
    res.send({ success: true, attachments: attachments });
  } catch (err) {
    console.error(err);
    logger.error(err);
    res.send({ error: "Error.ServerError" });
    res.end();
  }
};
