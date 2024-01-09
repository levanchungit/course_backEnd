import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import { parseJwt } from "utils/token";

const checkToken = async (req: Request, res: Response) => {
  try {
    const { access_token } = req.body;
    if (!access_token) {
      return res.status(500).json({ message: "Missing token" });
    }
    const parToken = parseJwt(access_token);
    const { _id, exp } = parToken;

    const user = await User.findOne({ _id, access_token });

    if (exp < new Date().getTime() / 1000) {
      return res.status(500).json({ message: "Access token expired" });
    }

    if (!user) {
      return res.status(500).json({ message: "Access token fail" });
    }

    return res.status(200).json({ message: "Access token is valid" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default checkToken;
