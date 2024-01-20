import { google, youtube_v3 } from "googleapis";
import { AuthService } from "./AuthService";

export class YoutubeService {
  private youtube: youtube_v3.Youtube;

  constructor(private authService: AuthService) {
    this.youtube = google.youtube({
      version: "v3",
      auth: this.authService.getOAuthClient(),
    });
  }

  async getVideos(channelId: string): Promise<youtube_v3.Schema$Video[]> {
    try {
      const accessToken = await this.authService.getAccessToken();
      const response = await this.youtube.playlistItems.list({
        part: ["snippet", "contentDetails"],
        maxResults: 50,
        playlistId: channelId,
        auth: accessToken,
      });

      const videos =
        response.data.items?.map((item) => {
          const video: youtube_v3.Schema$Video = {
            id: item.snippet?.resourceId?.videoId || "",
            snippet: item.snippet,
            contentDetails:
              item.contentDetails as youtube_v3.Schema$VideoContentDetails,
          };
          return video;
        }) || [];

      return videos;
    } catch (error: any) {
      console.error("Error fetching videos:", error.message);
      throw error;
    }
  }
}
