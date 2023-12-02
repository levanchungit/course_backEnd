import { Request, Response } from "express";
import User from "models/user";
import { getNow, validateFields } from "utils/common";

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.sendStatus(403);

    const { full_name, avatar, phone, gender, status, role } = req.body;

    const validateFieldsResult = validateFields(
      { full_name, avatar, phone, gender, status, role },
      [
        { name: "full_name", type: "string", required: true },
        { name: "avatar", type: "string", required: true },
        { name: "phone", type: "string", required: true },
        { name: "gender", type: "string", required: true },
        { name: "status", type: "string", required: true },
        { name: "role", type: "string", required: true },
      ]
    );
    if (validateFieldsResult)
      return res.status(400).json({ message: validateFieldsResult });

    user.full_name = full_name;
    user.avatar = avatar;
    user.phone = phone;
    user.gender = gender;
    user.status = status;
    user.role = role;

    user.modify.push({
      action: `Update user '${user.full_name}' by ${user.email}`,
      date: getNow(),
    });

    await user.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

export default updateUser;
