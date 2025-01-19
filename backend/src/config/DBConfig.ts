import mongoose from "mongoose";
import logger from "../config/logger";

const uri = `${process.env.DATABASE_URI}`; // Replace with your MongoDB connection string

mongoose
  .connect(uri, { autoIndex: true })
  .then(() => logger.debug("MongoDB connected"))
  .catch((err) => {
    logger.error(err);
  });
