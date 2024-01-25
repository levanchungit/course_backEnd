export type IThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type IItemsPlaylistListResponse = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: IThumbnail;
      medium: IThumbnail;
      high: IThumbnail;
      standard: IThumbnail;
      maxres: IThumbnail;
    };
    channelTitle: string;
    localized: {
      title: string;
      description: string;
    };
  };
};

export const Thumbnails = {
  url: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
};
