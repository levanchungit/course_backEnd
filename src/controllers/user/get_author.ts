import { Request, Response } from "express";
import User from "../../models/user";

const getAuthor = async (req: Request, res: Response) => {
  const user = await User.findOne({
    email: "levanchung.webcourse@gmail.com",
  }).select(
    "-_id -passwordHash -access_token -refresh_token -device_id -role -last_login -create_at -update_at -author._id -author.create_at -author.update_at"
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({
    result: user,
  });
};

export default getAuthor;
