import Home from "../models/Home.js";
import Broker from "../models/Broker.js";

export const getHomes = async (req, res, next) => {
  try {
    const homes = await Home.find().sort({ createdAt: -1 });
    res.status(200).json(homes);
  } catch (error) {
    next(error);
  }
};

export const createHome = async (req, res, next) => {
  try {
    const broker = await Broker.findById(req.body.brokerId);
    if (!broker)
      return res.status(400).json({ error: "Broker does not exist" });

    const home = await Home.create(req.body);
    res.status(201).json(home);
  } catch (error) {
    next(error);
  }
};

export const updateHome = async (req, res, next) => {
  try {
    const home = await Home.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!home) return res.status(404).json({ error: "Property not found" });
    res.status(200).json(home);
  } catch (error) {
    next(error);
  }
};

export const deleteHome = async (req, res, next) => {
  try {
    const home = await Home.findByIdAndDelete(req.params.id);
    if (!home) return res.status(404).json({ error: "Property not found" });
    res.status(200).json({ message: "Property deleted" });
  } catch (error) {
    next(error);
  }
};
