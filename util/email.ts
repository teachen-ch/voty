import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import Mustache from "mustache";
import mjml2html from "mjml";
import logger from "./logger";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const server = new SMTPTransport({
  host: process.env.SMTP_HOST,
  auth: {
    type: "LOGIN",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASSWORD || "",
  },
});

const templatesDir = "./mails/";

export async function sendMail(
  from: string,
  to: string,
  subject: string,
  template: string,
  data: Record<string, any>
): Promise<any> {
  const { html, text } = await renderTemplate(template, data);

  // No email configured
  if (!process.env.SMTP_PASSWORD || process.env.NODE_ENV === "test") {
    logger.info(`Now I'd send mail to ${to}`);
    return;
  }

  const mailer = nodemailer.createTransport(server);
  try {
    await mailer.sendMail({
      to,
      from,
      subject,
      text,
      html,
    });
  } catch (error) {
    logger.error("SEND_VERIFICATION_EMAIL_ERROR", to, error);
    throw new Error(`SEND_VERIFICATION_EMAIL_ERROR ${String(error)}`);
  }
}

async function renderTemplate(template: string, data: any) {
  let mjml: string;
  let text: string;
  const mjmlTemplate = templatesDir + template + ".mjml";
  const textTemplate = templatesDir + template + ".txt";
  try {
    mjml = await fs.readFile(mjmlTemplate, "utf8");
  } catch (err) {
    throw new Error("Could not find template " + mjmlTemplate);
  }
  try {
    text = await fs.readFile(textTemplate, "utf8");
  } catch (err) {
    text = mjml.replace(/<\/?[^>]+(>|$)/g, "");
  }

  const { html, errors } = mjml2html(Mustache.render(mjml, data));
  if (errors.length) {
    throw new Error(String(errors));
  }
  text = Mustache.render(text, data);

  return { html, text };
}
