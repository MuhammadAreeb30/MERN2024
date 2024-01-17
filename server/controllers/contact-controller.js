const Contact = require("../models/contact-model");
// *--------------
// Contact Logic
// *--------------
const contactFrom = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    res.status(201).json({
      msg: "Message Send Successfull",
    });
  } catch (error) {
    return res.status(500).json({ message: "message not delivered" });
  }
};

module.exports = contactFrom;
