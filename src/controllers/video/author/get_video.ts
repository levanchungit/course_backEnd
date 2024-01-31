import { Request, Response } from "express";
import Video, { IVideo } from "../../../models/video";

const getVideo = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;

    const video: IVideo | null = await Video.findById(_id);
    const result = {
      result: video,
    };

    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default getVideo;
