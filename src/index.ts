import express, { Response } from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import courseRouter from "./routes/course";
import postAuthorRouter from "./routes/post/author";
import courseAuthorRouter from "./routes/course/author";
import videoRouter from "./routes/video";
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
import axios from "axios";

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
app.use("/api/courses", courseRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/auth", authRouter);
app.use("/api/videos", videoRouter);

//ADMIN
app.use("/api/admin/upload", uploadRouter);
app.use("/api/admin/posts", postAuthorRouter);
app.use("/api/admin/courses", courseAuthorRouter);
app.use("/api/admin/categories", categoryAuthorRouter);

app.get("/api/ping", (req, res: Response) => {
  res.status(200).json({
    message: "pong",
  });
});

// Tự động cập nhât danh sách course
let time_automatic =
  parseInt(process.env.TIME_UPDATE_COURSE_AUTOMATIC ?? "") || 86400000;
setInterval(async () => {
  try {
    const loginRes = await axios.post(`http://localhost:3000/api/auth/login`, {
      email: process.env.EMAIL_ADMIN,
      passwordHash: process.env.PASSWORD_ADMIN,
      device_id: "admin nodejs express",
    });
    if (loginRes) {
      await axios.get(
        `http://localhost:3000/api/admin/courses/playLists?channelId=${process.env.channelId}`,
        {
          headers: {
            Authorization: `Bearer ${loginRes.data.access_token}`,
          },
        }
      );
    }
  } catch (error) {
    Log.error(error);
  }
}, time_automatic); //1h

// catch 404 and forward to error handler
app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  Log.success(`Server is running on port ${port}`);
});

export default app;
