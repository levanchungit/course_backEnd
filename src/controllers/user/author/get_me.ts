import { getIdFromReq } from "utils/token";
import User, { IUser } from "../../../models/user";
import { Request, Response } from "express";

const getMe = async (req: Request, res: Response) => {
  try {
    const id = getIdFromReq(req);

    const user: IUser | null = await User.findById(id);
    if (!user) {
      return res.sendStatus(404);
    }

    user.passwordHash = "";

    const result = {
      result: user,
    };

    return res.json(result);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default getMe;
