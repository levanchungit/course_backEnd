import bcrypt from "bcrypt";
import { getIdFromReq, hashPassword } from "utils/token";
import User, { IUser } from "../../../models/user";
import { Request, Response } from "express";
import { Author } from "interfaces/author";

const updateMe = async (req: Request, res: Response) => {
  try {
    const _id = getIdFromReq(req);

    const user: IUser | null = await User.findById(_id);
    if (!user) {
      return res.sendStatus(404);
    }

    const {
      email,
      passwordHash,
      instagram,
      linkedin,
      youtube,
      avatar,
      facebook,
      introduction,
      name,
    } = req.body;

    if (email) {
      user.email = email;
    }

    if (passwordHash) {
      user.passwordHash = await hashPassword(passwordHash);
    }

    if (user.author) {
      // create author
      if (instagram) {
        user.author.instagram = instagram;
      }
      if (linkedin) {
        user.author.linkedin = linkedin;
      }
      if (youtube) {
        user.author.youtube = youtube;
      }
      if (avatar) {
        user.author.avatar = avatar;
      }
      if (facebook) {
        user.author.facebook = facebook;
      }
      if (introduction) {
        user.author.introduction = introduction;
      }
      if (name) {
        user.author.name = name;
      }
    }
    if (!user.author) {
      // create author
      user.author = {
        instagram: instagram ? instagram : "temp",
        linkedin: linkedin ? linkedin : "temp",
        youtube: youtube ? youtube : "temp",
        avatar: avatar ? avatar : "temp",
        facebook: facebook ? facebook : "temp",
        introduction: introduction ? introduction : "temp",
        name: name ? name : "temp",
        create_at: new Date(),
        update_at: new Date(),
      };
    }

    // Sử dụng findByIdAndUpdate thay vì save
    await User.findByIdAndUpdate(_id, user, {
      new: true,
    });

    const result = {
      result: "OK",
    };

    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

export default updateMe;
