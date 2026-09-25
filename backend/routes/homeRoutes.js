import express from "express";
import {
  getHomes,
  createHome,
  updateHome,
  deleteHome,
} from "../controllers/homeController.js";

const router = express.Router();
router.route("/").get(getHomes).post(createHome);
router.route("/:id").put(updateHome).delete(deleteHome);

export default router;
