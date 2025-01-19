import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import fs from "fs";

const logsDirectory = path.join(path.dirname(require.main.filename), "logs");

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(), // Console transport for logging to console
    new DailyRotateFile({
      level: "info",
      dirname: logsDirectory,
      filename: "application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m", // Max size of a log file
      maxFiles: "14d", // Retention period of logs (14 days in this case)
    }),
  ],
});

export default logger;
