import express from "express";
import routes from "./routes";
import auth from "./middlewares/auth";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(auth());
app.use(routes);
app.use(errorHandler());

export default app;
