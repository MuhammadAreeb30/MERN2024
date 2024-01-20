const User = require("../models/user-model");
const Contact = require("../models/contact-model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.lenght === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

// *----------------
// User Delete Logic
// *----------------
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

// *----------------
// User Update Logic
// *----------------
const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;
    const updatedData = await User.updateOne(
      { _id: id },
      { $set: updatedUserData }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    console.log(error);
  }
};

// *--------------------
// Get Single User Logic
// *--------------------
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

// *-------------------
// getAllContacts logic
// *-------------------
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.lenght === 0) {
      return res.status(404).json({ message: "No Contacts Found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
  }
};

// *-------------------
// deleteContact logic
// *-------------------
const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ message: "User Contact Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  getUserById,
  updateUserById,
  deleteUserById,
  deleteContactById,
};
