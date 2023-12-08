import express, { Response } from "express";
import mongoose from "mongoose";
import userRouter from "routes/user";
import postRouter from "routes/post";
import categoryRouter from "routes/category";
import authRouter from "routes/auth";
import { config } from "dotenv";
import Log from "libraries/log";
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

app.use(cors());
app.set("Access-Control-Allow-Origin", "*");
// Body parser configuration
// Express 4.0
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(morgan("dev"));
app.use(helmet());
app.use(nocache());

/* Routes */
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/categories", categoryRouter);
app.use("/auth", authRouter);

app.get("/ping", (req, res: Response) => {
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
