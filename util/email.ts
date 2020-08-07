import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import Mustache from "mustache";
import mjml2html from "mjml";

const server = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

const mailer = nodemailer.createTransport(server);
const templatesDir = "./mails/";

export async function sendMail(
  from: string,
  to: string,
  subject: string,
  template: string,
  data: any
) {
  const { html, text } = await renderTemplate(template, data);
  try {
    await mailer.sendMail({
      to,
      from,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("SEND_VERIFICATION_EMAIL_ERROR", to, error);
    throw new Error("SEND_VERIFICATION_EMAIL_ERROR" + error);
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
    throw new Error(errors);
  }
  text = Mustache.render(text, data);

  return { html, text };
}
