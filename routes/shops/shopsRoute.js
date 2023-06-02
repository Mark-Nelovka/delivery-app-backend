import express from "express";
import getAllShops from "../../controllers/getAllShops.js";
const router = express.Router();

router.get("/", getAllShops);

export default router;
