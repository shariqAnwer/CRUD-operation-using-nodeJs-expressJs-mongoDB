const User = require("../model/User");

// function  for GET request
const getAllUsers = async (req, res, next) => {
  let users; //declare a variable as users
  try {
    users = await User.find();
  } catch (err) {
    return next(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Internal server error" });
  }

  return res.status(200).json({ users });
};

//function for POST request

const addUser = async (req, res, next) => {
  const { name, email, password } = req.body; //we will extract data from the body
  if (
    !name &&
    name.trim() == "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.length < 6
  ) {
    return res.status(422).json({ message: "Invalid data" });
  }

  let user;
  try {
    user = new User({
      name,
      email,
      password,
    });
    user = await user.save();
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(500).json({ message: "unable to save user" });
  }
  return res.status(201).json({ user }); //status 201 means something is created in the database
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body; //we will extract data from the body
  if (
    !name &&
    name.trim() == "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.length < 6
  ) {
    return res.status(422).json({ message: "Invalid data" });
  }
  let user;
  try {
    user = await User.findByIdAndUpdate(id, { name, email, password });
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to save user" });
  }
  return res.status(200).json({ message: "updated successfully" });
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "unable to delete" });
  }
  return res.status(200).json({ message: "successfully deleted" });
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  return res.status(200).json({ user });
};

exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
