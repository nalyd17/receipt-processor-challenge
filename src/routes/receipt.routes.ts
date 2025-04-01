import { Router } from "express";
import {
  getPointsForReceipt,
  processReceipt,
} from "../controllers/receipt.controller";

const router = Router();

router.post("/process", processReceipt);
router.get("/:id/points", getPointsForReceipt);

export default router;
