// server/middlewares/verifyOwner.js
import Home from "../models/Home.js";

export const verifyHomeOwnership = async (req, res, next) => {
  try {
    const home = await Home.findById(req.params.id);
    if (!home) {
      return res.status(404).json({ error: "Property not found" });
    }

    // req.user is set by your JWT auth middleware
    const isOwner = home.brokerId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You can only modify your own homes" });
    }

    req.home = home;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
