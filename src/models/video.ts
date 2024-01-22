import { IThumbnail, Thumbnails } from "../interfaces/comment";
import { Document, model, Schema } from "mongoose";
import slugify from "slugify";
/*********************TYPE & INTERFACE*****************************/
export type StatusVideoType = "publish" | "private" | "delete";

export type IVideo = {
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

export type VideoTypeModel = IVideo & Document;

/*******************************SCHEMA*****************************/

const videoSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  publishedAt: { type: Date, required: true, default: Date.now },
  channelId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnails: { type: Thumbnails, required: true },
  playlistId: { type: String, required: true },
  videoId: { type: String, required: true },
});

videoSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
  }
  next();
});

const Video = model<VideoTypeModel>("Video", videoSchema);

export default Video;
