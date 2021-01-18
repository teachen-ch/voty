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
  // TODO: This is ugly, trying to make email work on ipv6 docker
  tls: { rejectUnauthorized: false },
});

const templatesDir = "./mails/";

export async function sendMail(args: {
  from: string;
  to: string;
  subject: string;
  template: string;
  data?: Record<string, any>;
}): Promise<any> {
  const { from, to, subject, template, data = {} } = args;
  const { html, text } = await renderTemplate(template, data);

  // No email configured
  if (!process.env.SMTP_PASSWORD || process.env.NODE_ENV === "test") {
    logger.info(`Writing mail to ${to} into temp file: /tmp/voty-email`);
    await fs.writeFile("/tmp/voty-email", text);
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
    logger.error(`Cannot send email to ${to}`, error);
    throw new Error(`SEND_VERIFICATION_EMAIL_ERROR ${String(error)}`);
  }
}

async function renderTemplate(template: string, data: Record<string, string>) {
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
