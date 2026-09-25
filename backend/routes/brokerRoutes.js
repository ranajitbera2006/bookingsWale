import express from "express";
import {
  getBrokers,
  createBroker,
  updateBroker,
  deleteBroker,
} from "../controllers/brokerController.js";

const router = express.Router();
router.route("/").get(getBrokers).post(createBroker);
router.route("/:id").put(updateBroker).delete(deleteBroker);

export default router;
