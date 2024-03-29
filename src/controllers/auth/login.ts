import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../../models/user";
import { tokenGen } from "../../utils/token";

const login = async (req: Request, res: Response) => {
  try {
    const { email, passwordHash, device_id } = req.body;
    if (!email || !passwordHash || !device_id) {
      return res
        .status(500)
        .json({ message: "Missing email or password or device_id" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.passwordHash) {
      return res
        .status(500)
        .json({ message: "User not have password, please set password" });
    }

    const validPass = await bcrypt.compare(passwordHash, user.passwordHash);
    if (!validPass) {
      return res.status(400).json({ message: "Password is invalid" });
    }
    const contentToken = { _id: user.id, role: user.role };
    const access_token = tokenGen(
      contentToken,
      parseInt(<string>process.env.EXPIRED_ACCESS_TOKEN)
    );
    const refresh_token = tokenGen(
      contentToken,
      parseInt(<string>process.env.EXPIRED_REFRESH_TOKEN)
    );
    user.access_token = access_token;
    user.refresh_token = refresh_token;
    if (device_id != "") user.device_id = device_id;
    user.last_login = new Date();
    await user.save();
    return res.status(200).json({
      message: "Login success",
      access_token,
      refresh_token,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default login;
