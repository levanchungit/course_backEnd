import express, { Response } from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import postAuthorRouter from "./routes/post/author";
import categoryRouter from "./routes/category";
import categoryAuthorRouter from "./routes/category/author";
import authRouter from "./routes/auth";
import uploadRouter from "./routes/upload";
import { config } from "dotenv";
import Log from "./libraries/log";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import nocache from "nocache";
import morgan from "morgan";

const app = express();
config();

const port = process.env.PORT || 3000;

/** Connect to Mongo */
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI || "", { retryWrites: true, w: "majority" })
  .then(() => {
    Log.success("✅ Mongo connected successfully.");
  })
  .catch((error) => Log.error("❌ " + error));

//fix error CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});
app.use(cors());

// Body parser configuration
// Express 4.0
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(morgan("dev"));
app.use(helmet());
app.use(nocache());

/* Routes */
app.get("/", (req, res: Response) => {
  res.end(`COURSE WEB API`);
});

//USER
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);

//ADMIN
app.use("/api/admin/posts", postAuthorRouter);
app.use("/api/admin/categories", categoryAuthorRouter);

app.get("/api/ping", (req, res: Response) => {
  res.status(200).json({
    message: "pong",
  });
});

// catch 404 and forward to error handler
app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  Log.success(`Server is running on port ${port}`);
});

export default app;
