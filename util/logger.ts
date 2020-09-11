import winston, { createLogger, transports, format } from "winston";
import { Mail } from "winston-mail";
import { Loggly } from "winston-loggly-bulk";

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
  format: winston.format.json(),
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
  format: format.combine(
    format.padLevels(),
    format.colorize(),
    format.printf(({ level, message }) => {
      return `[${level}] ${message}`;
    })
  ),
});
const fileLogger = new transports.File({
  filename: "./logs/voty.log",
  level: "info",
  handleExceptions: true,
  maxsize: 1024 * 1024 * (prod ? 10 : 1),
  maxFiles: prod ? 3 : 1,
  format: format.combine(
    format.padLevels(),
    format.printf(({ level, message }) => {
      return `[${level}] ${message}`;
    })
  ),
});

const logglyLogger = new Loggly({
  level: "info",
  subdomain: "teachen.ch",
  inputToken: "d678db9a-c0dd-49b0-a885-f168172332c6",
  stripColors: true,
  json: true,
  tags: [process.env.NODE_ENV],
});

const mailLogger: any = new Mail({
  level: "mail",
  to: "stefan@teachen.ch",
  from: "voty@teachen.ch",
  subject: "Voty Admin Mail",
  host: mailConfig.host,
  username: mailConfig.auth.user,
  password: mailConfig.auth.pass,
  ssl: true,
});

logger.add(fileLogger);
logger.add(logglyLogger);

if (env === "production") {
  logger.add(mailLogger);
  logger.exceptions.handle(mailLogger);
} else {
  logger.add(consoleLogger);
}

interface MailLogger extends winston.Logger {
  mail?: (message: string) => {};
}

const mLogger: MailLogger = logger;
mLogger.mail = (message: string) => logger.log("mail", message);
export default mLogger;
