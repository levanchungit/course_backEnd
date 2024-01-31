// @ts-nocheck
import { Request, Response } from "express";
import { google } from "googleapis";
import Video from "models/video";
import { ObjectId } from "mongodb";

const getYouTubeAuth = async () => {
  return new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.KEYFILE_JSON_CONTENT),
    scopes: "https://www.googleapis.com/auth/youtube.readonly",
  });
};

const getYouTubeVideos = async (auth, channelId) => {
  const youtube = google.youtube({ version: "v3", auth });
  const searchResponse = await youtube.search.list({
    part: "snippet",
    channelId,
    type: "video",
    maxResults: 50,
  });

  const videoIds = [];
  for (const item of searchResponse.data.items) {
    videoIds.push(item.id.videoId);
  }

  const videosResponse = await youtube.videos.list({
    part: "snippet,contentDetails",
    id: videoIds.join(","),
  });

  return videosResponse.data.items;
};

const mapVideoDetails = (item) => ({
  _id: new ObjectId(),
  publish_at: item.snippet.publishedAt,
  channelId: item.snippet.channelId,
  title: item.snippet.title,
  description: item.snippet.description,
  thumbnails: item.snippet.thumbnails.maxres,
  playlistId: "",
  videoId: item.id,
});

const autoInsertVideosYoutube = async (req: Request, res: Response) => {
  try {
    const auth = await getYouTubeAuth();
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    console.log(channelId);
    const videos = await getYouTubeVideos(auth, channelId);
    const videoDetails = videos.map(mapVideoDetails);
    await Video.deleteMany({});
    await Video.insertMany(videoDetails);

    res.status(200).json({
      message: "Success",
      totalVideos: videoDetails.length,
      videos: videoDetails,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default autoInsertVideosYoutube;
