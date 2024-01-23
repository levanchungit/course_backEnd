import { Request, Response } from "express";
import { getNow } from "../../utils/common";
import Comment, { IComment } from "models/comment";
import Post from "models/post";
import { ObjectId } from "mongodb";
import axios from "axios";

const create = async (req: Request, res: Response) => {
  try {
    const { tokenCaptcha, type, email, name, content, slug } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;

    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${tokenCaptcha}`
    );

    //Không check slug
    if (response.data.success) {
      if (!email || !content || !name || !type) {
        return res.status(404).json({
          message: "Required fields are missing",
        });
      }

      //get postId by slug
      let postId;
      if (slug) {
        postId = (await Post.findOne({ slug: slug }))?.id;
      }

      const comment: IComment = new Comment({
        _id: new ObjectId(),
        name: name,
        postId: postId ? postId : null,
        email: email,
        content: content,
        create_at: getNow(),
        update_at: getNow(),
        status: "public",
        device_id: ipAddress,
        favorites: {
          device_id: ipAddress,
          create_at: getNow(),
          update_at: getNow(),
        },
        type: type,
      });

      await comment.save();

      //Kiểm tra xem có post id && type === "comment" thì mới push vào post
      if (postId && type === "comment") {
        const post: any = await Post.findById(postId);

        if (post) {
          const comments: any = post.comments;
          const index = comments.findIndex((item: any) => {
            return item.toString() === comment._id.toString();
          });
          if (index === -1) {
            comments.push(comment._id);
            await Post.findByIdAndUpdate(postId, {
              comments: comments,
            });
          }
        }
      }

      const result = {
        message: "Comment created successfully",
      };
      return res.status(201).json(result);
    } else {
      return res.status(404).json({
        message: "Captcha is invalid",
      });
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

export default create;
