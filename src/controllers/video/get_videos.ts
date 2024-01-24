import { Request, Response } from "express";
import Video from "models/video";

const getVideos = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortDirection = (req.query.sort as string) || "asc";
    const startIndex = (page - 1) * limit;

    let sortQuery = {};
    if (sortDirection === "asc") {
      sortQuery = { publishedAt: 1 };
    } else if (sortDirection === "desc") {
      sortQuery = { publishedAt: -1 };
    }

    const videos = await Video.find({})
      .sort(sortQuery)
      .limit(limit)
      .skip(startIndex)
      .select("-_id -__v");

    const total = videos.length;

    const results = {
      total: total,
      page: page,
      limit: limit,
      results: videos,
    };

    return res.json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getVideos;
