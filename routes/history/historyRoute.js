import express from "express";
import getHistory from "../../controllers/getHistory.js";

const router = express.Router();

router.get("/", getHistory);

export default router;
