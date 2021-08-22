import { getSessionUser } from "graphql/resolvers/users";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "util/logger";
import { sendMail } from "util/email";

const feedbackEmail = "feedback@voty.ch";

export default async function feedbackApi(
  req: NextApiRequest,
  res: NextApiResponse<{
    success?: boolean;
    error?: string;
  }>
): Promise<void> {
  try {
    const fields = JSON.parse(req.body) as Record<string, string>;
    const { card, title, text, type, quest, email } = fields;
    const user = getSessionUser(req) || {
      name: "Anon",
      email: email || feedbackEmail,
      locale: "de",
    };
    const data = { card, title, text, type, user, quest };

    await sendMail({
      from: String(user.email),
      to: feedbackEmail,
      subject: `voty.ch Feedback: ${title}`,
      template: "feedback",
      locale: user.locale,
      data,
    });

    res.send({ success: true });
  } catch (err) {
    console.error(err);
    logger.error(err);
    res.send({ error: "Error.SendEmailError" });
  }
}
