import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import { receiptSchema } from "../validators/receipt.validator";
import {
  saveReceiptPoints,
  getReceiptPointsById,
} from "../stores/receipt.store";
import { calculatePoints } from "../utils/points-calculator";

export const processReceipt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const parsed = receiptSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "The receipt is invalid.",
        errors: parsed.error.flatten(),
      });
    }

    const id = uuid();
    const receipt = parsed.data;
    const points = calculatePoints(receipt);
    saveReceiptPoints(id, points);

    res.status(200).json({ id });
  } catch (err) {
    next(err);
  }
};

export const getPointsForReceipt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const points = getReceiptPointsById(id);

    if (points === undefined) {
      return res.status(404).json({
        message: "No receipt found for that ID.",
      });
    }

    res.status(200).json({ points });
  } catch (err) {
    next(err);
  }
};
