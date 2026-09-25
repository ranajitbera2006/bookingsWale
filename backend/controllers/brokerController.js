import Broker from "../models/Broker.js";
import Home from "../models/Home.js";
import User from "../models/User.js";

export const getBrokers = async (req, res, next) => {
  try {
    const brokers = await Broker.find().sort({ createdAt: -1 });
    res.status(200).json(brokers);
  } catch (error) {
    next(error);
  }
};

export const createBroker = async (req, res, next) => {
  try {
    const { name, email, password, phone1, phone2, location, rooms, status } =
      req.body;

    // Check if email already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "A user account with this email already exists" });
    }

    // 1. Create Broker record
    const broker = await Broker.create({
      name,
      phone1,
      phone2,
      location,
      rooms: Number(rooms) || 0,
      status: status || "Active",
    });

    // 2. Auto-generate or assign password
    const tempPassword = password || `BW@${phone1.slice(-4)}`;

    // 3. Create Login credentials
    await User.create({
      name,
      email,
      password: tempPassword,
      role: "broker",
      brokerId: broker._id,
    });

    res.status(201).json({
      ...broker.toJSON(),
      email,
      temporaryPassword: tempPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBroker = async (req, res, next) => {
  try {
    const broker = await Broker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!broker) return res.status(404).json({ error: "Broker not found" });
    res.status(200).json(broker);
  } catch (error) {
    next(error);
  }
};

export const deleteBroker = async (req, res, next) => {
  try {
    const broker = await Broker.findByIdAndDelete(req.params.id);
    if (!broker) return res.status(404).json({ error: "Broker not found" });

    // Cascade: remove user account & homes
    await User.deleteMany({ brokerId: req.params.id });
    await Home.deleteMany({ brokerId: req.params.id });

    res
      .status(200)
      .json({ message: "Broker and all associated properties removed" });
  } catch (error) {
    next(error);
  }
};
