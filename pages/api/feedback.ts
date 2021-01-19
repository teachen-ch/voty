import { getSessionUser } from "graphql/resolvers/users";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "util/logger";
import { sendMail } from "util/email";

const feedbackEmail = "feedback@voty.ch";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<{
    success?: boolean;
    error?: string;
  }>
): Promise<void> => {
  try {
    const user = getSessionUser(req) || { name: "Anon", email: feedbackEmail };
    const fields = JSON.parse(req.body) as Record<string, string>;
    const { card, title, text, type, quest } = fields;
    const data = { card, title, text, type, user, quest };

    await sendMail({
      to: String(user.email),
      from: feedbackEmail,
      subject: `voty Feedback: ${title}`,
      template: "feedback",
      data,
    });

    res.send({ success: true });
  } catch (err) {
    console.error(err);
    logger.error(err);
    res.send({ error: "Error.ServerError" });
  }
};
