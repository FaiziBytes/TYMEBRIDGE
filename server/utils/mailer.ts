import nodemailer, { type Transporter } from "nodemailer";
import { appConfig } from "../config/app.config";
import { logger } from "./logger";

export interface MailAttachment {
  filename?: string;
  path?: string;
  content?: Buffer | string;
  cid?: string;
  contentType?: string;
}

let transporter: Transporter | null = null;
let warnedAboutMissingSmtpInProduction = false;

function getTransporter(): Transporter | null {
  if (transporter) return transporter;

  const { host, port, user, password, secure } = appConfig.smtp;
  if (!user || !password) {
    if (appConfig.isProduction && !warnedAboutMissingSmtpInProduction) {
      logger.error(
        "SMTP_USER / SMTP_PASSWORD are not configured — outbound email is being LOGGED, not sent."
      );
      warnedAboutMissingSmtpInProduction = true;
    }
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: secure ?? port === 465,
    auth: { user, pass: password },
  });

  return transporter;
}

export interface MailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: MailAttachment[];
}

export async function sendMail(message: MailMessage): Promise<void> {
  const t = getTransporter();
  if (!t) {
    logger.warn(
      `[dev mail] To: ${message.to} | Subject: ${message.subject}\n${message.text}`
    );
    return;
  }

  const attachments = message.attachments ?? [];

  await t.sendMail({
    from: appConfig.smtp.from,
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html,
    attachments: attachments.length ? attachments : undefined,
  });
}
