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
