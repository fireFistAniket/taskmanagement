import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.userId).populate("task").exec();
      next();
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "invalid token" });
    }
  } else {
    res.status(404).json({ message: "not authorized" });
  }
};
