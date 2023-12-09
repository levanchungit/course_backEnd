import { Response } from "express";
import Log from "../libraries/log";
import { Types } from "mongoose";
import nodemailer from "nodemailer";

const sendMail = (
  user_id: Types.ObjectId,
  otp: number | undefined,
  email: string,
  res: Response,
  type: string
) => {
  if (!otp) {
    return res.status(400).json({
      message: "OTP is not valid",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_APP_MAIL,
      pass: process.env.PASS_APP_MAIL,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const content = `<div style="font-family: 'Railway', sans-serif; width: 90%; max-width: 1000px; margin: 50px auto; overflow: auto; line-height: 2;">
  <div style="padding: 20px 0; border-bottom: 1px solid #eee;">
    <a href="" style="font-size: 1.4em; color: #AC1506; text-decoration: none; font-weight: 600;">Seven Shop</a>
  </div>
  <p style="font-size: 1.1em;">Hi,</p>
  <p style="font-size: 1em;">Thank you for choosing Seven Shop. Use the following OTP to complete your ${type} procedures. OTP is valid for ${process.env.EXPIRED_OTP} minutes</p>
  <h2 style="background: #AC1506; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px; font-size: 1.5em;">${otp}</h2>
  <p style="font-size: 0.9em;">Regards,<br />Seven Shop</p>
  <hr style="border: none; border-top: 1px solid #eee;" />
</div>`;

  const mailOptions = {
    from: process.env.USER_APP_MAIL,
    to: email,
    subject: "Verify your email",
    html: content,
  };

  transporter.sendMail(mailOptions, async (err) => {
    if (err) {
      Log.error(err);
      return res.status(500).json({ message: "Send email fail" });
    }

    return res.status(200).json({
      message: "Send email success",
      result: {
        user_id,
      },
    });
  });
};
