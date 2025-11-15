import express from "express";
import multer from "multer";
import { transcribeAndRespond } from "../controllers/aiCtrl.js";
import { protect } from "../middleware/auth.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
  "/transcribe",
  protect,
  upload.single("audio"),
  transcribeAndRespond
);

export default router;
