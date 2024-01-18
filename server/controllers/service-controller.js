const Service = require("../models/service-model");

const services = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(404).json({ msg: "No Service Found" });
    }
    res.status(200).json({ response });
  } catch (error) {
    console.error(`servces: ${error}`);
  }
};

module.exports = services;