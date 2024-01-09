import upload from "controllers/upload/image";
import { Router } from "express";
import { validateAuthor } from "middleware/validate";
import { v2 as cloudinary } from "cloudinary";
import moment from "moment";

const router = Router();
const isAuthor = [validateAuthor];

const uploader = async (path: string) => {
  const currentDate = new Date();
  const formattedDatePathName = moment(currentDate).format('YYYY-MM');
  const folderPath = `WebCourse/${formattedDatePathName}/`;
  
  const formattedDateFileName = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');

  return await cloudinary.uploader.upload(path, {
    folder: folderPath,
    public_id: formattedDateFileName,
  });
};

router.post(
  "/single",
  isAuthor,
  upload.single("file"),
  async (req: any, res: any, next: any) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    const newPath = await uploader(req.file.path);

    res.json({ secure_url: newPath.secure_url });
  }
);

router.post(
  "/multiple",
  isAuthor,
  upload.array("files", 10),
  async (req: any, res: any, next: any) => {
    if (!req.files) {
      next(new Error("No file uploaded!"));
      return;
    }

    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath.secure_url);
    }
    res.json({ secure_urls: urls });
  }
);

export default router;
