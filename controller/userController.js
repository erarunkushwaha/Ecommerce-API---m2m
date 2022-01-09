const User = require("../models/users");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { use } = require("express/lib/router");
const { response } = require("express");

const getAllUsers = async (req, res) => {
  res.send("i am woring");
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json(req.user);
};

const createOrUpdateUser = async (req, res) => {
  const { name, email, picture, uid } = req.user;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    const user = await User.findOneAndUpdate(
      { email },
      { name, email, picture },
      { new: true }
    );

    res.status(StatusCodes.CREATED).json({ user });
  } else {
    const user = await User.create({ name, email, picture, uid });

    res.status(StatusCodes.CREATED).json({ user });
  }
};

const currentUser = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  if (!user) {
    throw new CustomError.UnauthenticatedError(`No user with id`);
  }
  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  createOrUpdateUser,
  currentUser,
};
