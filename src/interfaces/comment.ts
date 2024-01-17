export type IFavoriteComment = {
  device_id: string;
  create_at: Date;
  update_at: Date;
};

export type IComment = {
  content: string;
  create_at: Date;
  update_at: Date;
  name: string;
  email: string;
  favorites: IFavoriteComment;
};

export type IThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type IItems = {
  publishedAt: Date;
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
  playlistId: string;
  videoId: string;
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

export const Comment = {
  content: { type: String, required: true },
  create_at: { type: Date, required: true, default: Date.now },
  update_at: { type: Date, required: true, default: Date.now },
  name: { type: String, required: true },
  email: { type: String, required: true },
  favorites: { type: FavoriteComment, required: true },
};

export const Thumbnails = {
  url: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
};

export const Items = {
  publishedAt: { type: Date, required: true, default: Date.now },
  channelId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnails: { type: Thumbnails, required: true },
  playlistId: { type: String, required: true },
  videoId: { type: String, required: true },
};
