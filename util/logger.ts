import winston, { createLogger, transports, format } from "winston";
const { Mail } = require("winston-mail");

const env = process.env.NODE_ENV;
const prod = env === "production";

const mailConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

let winstonFormat = format.json();
if (!prod) {
  winstonFormat = format.combine(format.json(), format.prettyPrint());
}

let logger = createLogger({
  levels: {
    mail: 0,
    alert: 1,
    error: 2,
    warn: 3,
    info: 4,
    debug: 5,
  },
  format: format.combine(
    format.padLevels(),
    format.colorize(),
    format.printf(({ level, message }) => {
      return `[${level}] ${message}`;
    })
  ),
});

winston.addColors({
  mail: "green",
  alert: "purple",
  error: "red",
  warn: "orange",
  info: "green",
  debug: "gray",
});

const consoleLogger = new transports.Console({
  level: prod ? "error" : "info",
});
const fileLogger = new transports.File({
  filename: "./logs/voty.log",
  level: "info",
  handleExceptions: true,
  maxsize: 1024 * 1024 * (prod ? 10 : 1),
  maxFiles: prod ? 3 : 1,
});

const mailLogger = new Mail({
  level: "mail",
  to: "stefan@teachen.ch",
  from: "voty@teachen.ch",
  subject: "Voty Admin Mail",
  host: mailConfig.host,
  username: mailConfig.auth.user,
  password: mailConfig.auth.pass,
  ssl: true,
});

if (env === "production") {
  logger.add(fileLogger);
  logger.add(mailLogger);
  logger.exceptions.handle(mailLogger);
} else {
  logger.add(consoleLogger);
  logger.add(fileLogger);
  logger.exceptions.handle(mailLogger);
}

interface MailLogger extends winston.Logger {
  mail?: (message: string) => {};
}

const mLogger: MailLogger = logger;
mLogger.mail = (message: string) => logger.log("mail", message);
export default mLogger;
