export type IAuthor = {
  avatar: string;
  name: string;
  introduction: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  create_at: Date;
  update_at: Date;
};

export const Author = {
  avatar: { type: String, required: true },
  name: { type: String, required: true },
  introduction: { type: String, required: true },
  instagram: { type: String, required: true },
  facebook: { type: String, required: true },
  linkedin: { type: String, required: true },
  youtube: { type: String, required: true },
  create_at: { type: Date, required: true, default: Date.now },
  update_at: { type: Date, required: true, default: Date.now },
};
