import "dotenv/config";
import "./src/config/logger";
import "./src/config/DBConfig";
import express from "express";
import cors from "cors";
import CORN_OPTIONS from "./src/constant/cornOptions";
import entryHandler from "./src/utils/http_request_handlers/entryHandler";
import globalErrorHandler from "./src/utils/http_request_handlers/globalErrorHandler";
import notFoundHandler from "./src/utils/http_request_handlers/notFoundHandler";
import apiV1 from "./src/api/v1";
import bodyParser from "body-parser";

const port = process.env.PORT || 8000;

const app = express();

// app configurations
app.use(cors(CORN_OPTIONS));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ type: "application/json" }));

// entry handler
app.use(entryHandler);
app.use("/api/v1", apiV1);
// 404 error handler
app.use(notFoundHandler);
// error handler
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`);
});
