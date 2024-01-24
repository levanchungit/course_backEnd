import { Request, Response } from "express";
import Post, { IPost } from "../../models/post";

const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;

    const post: IPost | null = await Post.findOne({ slug: slug })
      .populate({
        path: "comments",
        match: { status: "public" },
        select:
          "-_id -email -ipAddress -postId -__v -status -favorites -type -update_at",
      })
      .populate({
        path: "categories",
        select: "-_id -update_at -create_at -note -__v",
      })
      .select(
        "-_id -__v -author -status -note -view -like -share -update_at -cover_image -publish_at"
      ) as IPost | null;

    const result = {
      result: post,
    };

    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default getPostBySlug;
