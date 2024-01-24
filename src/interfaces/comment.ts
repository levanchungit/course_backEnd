export type IFavoriteComment = {
  device_id: string;
  create_at: Date;
  update_at: Date;
};

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

export const FavoriteComment = {
  device_id: { type: String, required: true },
  create_at: { type: Date, required: true, default: Date.now },
  update_at: { type: Date, required: true, default: Date.now },
};

export const Thumbnails = {
  url: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
};
