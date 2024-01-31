import { ObjectId } from "mongodb";
import { IThumbnail, Thumbnails } from "../interfaces/comment";
import { Document, model, Schema } from "mongoose";
/*********************TYPE & INTERFACE*****************************/
export type StatusVideoType = "publish" | "private" | "delete";

export type IVideo = {
  _id: ObjectId;
  publish_at: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IThumbnail;
  playlistId: string;
  videoId: string;
};

export type VideoTypeModel = IVideo & Document;

/*******************************SCHEMA*****************************/

const videoSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  publish_at: { type: Date, required: true, default: Date.now },
  channelId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnails: { type: Thumbnails, required: true },
  playlistId: { type: String },
  videoId: { type: String, required: true },
});

const Video = model<VideoTypeModel>("Video", videoSchema);

export default Video;
