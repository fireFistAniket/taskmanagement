import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

const addTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = await Task.create({
      title: title,
      description: description,
      author: req.user._id,
    });
    await User.findByIdAndUpdate(req.user._id, { $push: { task: newTask } });
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something error occured" });
  }
};
const getAllTaskOfUser = async (req, res) => {
  try {
    const tasks = req.user.task;
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "not logged in" });
  }
};
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description } = req.body;
  try {
    const changedTask = {
      title: title,
      description: description,
    };
    const task = await Task.findByIdAndUpdate(taskId, changedTask, {
      new: true,
    });
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "not logged in" });
  }
};
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    await Task.findByIdAndDelete(taskId);
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { task: taskId } },
      false,
      true
    );
    res.status(200).json({ message: "delete successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "not logged in" });
  }
};
export { addTask, getAllTaskOfUser, updateTask, deleteTask };
