import { Request, Response } from "express";
import User from "models/user";
import { getIdFromReq } from "utils/token";

const logout = async (req: Request, res: Response) => {
  try {
    const id = getIdFromReq(req);
    const user = await User.findById(id);
    if (!user) {
      return res.status(500).json({ message: "Logout fail" });
    }
    user.access_token = "";
    user.refresh_token = "";
    await user.save();
    return res.status(200).json({ message: "Logout success" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default logout;
