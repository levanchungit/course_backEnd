// videosController.ts
import { Request, Response } from "express";
import { google } from "googleapis";
import prompts from "prompts";

const getVideos = async (req: Request, res: Response) => {
  try {
    const clientId = process.env.YOUTUBE_CLIENT_ID ?? "";
    const clientSecret = process.env.YOUTUBE_CLIENT_SECRET ?? "";
    const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN ?? "";
    const channelId = process.env.YOUTUBE_CHANNEL_ID ?? "";

    var service = google.youtube("v3");
    //get list video of channel id
    const response = await service.playlistItems.list({
      auth: oauth2Client,
      part: "snippet",
      playlistId: channelId,
      maxResults: 50,
    });

    res.status(200).json({ yt_refresh_token });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getVideos;
