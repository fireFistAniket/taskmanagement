import User from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";
const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (await user.matchPassword(password)) {
        generateToken(res, user._id);
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(404).json({ message: "password is incorrect" });
      }
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong");
  }
};
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(404);
      throw new Error("User already exist");
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });
    generateToken(res, newUser._id);
    res
      .status(201)
      .json({ _id: newUser._id, name: newUser.name, email: newUser.email });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong");
  }
};
const logOut = async (req, res) => {
  res.cookie({
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out" });
};
const getUserDetails = async (req, res) => {
  try {
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      task: req.user.task,
    };
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "not logged in" });
  }
};
const updateUserDetails = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = {
      name: name || req.user.name,
      password: password || req.user.password,
    };
    const updatedUser = await User.findByIdAndUpdate(req.user._id, user);
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      task: updatedUser.task,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "you are not logged in" });
  }
};
export { authUser, registerUser, logOut, getUserDetails, updateUserDetails };
