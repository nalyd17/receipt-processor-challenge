import { z } from "zod";

export const itemSchema = z.object({
  shortDescription: z
    .string()
    .min(1)
    .regex(/^[\w\s\-]+$/),

  price: z
    .string()
    .regex(/^\d+\.\d{2}$/)
    .transform((val) => parseFloat(val)),
});

export const receiptSchema = z.object({
  retailer: z
    .string()
    .min(1)
    .regex(/^[\w\s\-&]+$/),

  purchaseDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .transform((val) => new Date(`${val}T00:00:00`)),

  purchaseTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .transform((val) => {
      const [hour, minute] = val.split(":").map(Number);
      return { hour, minute };
    }),

  items: z.array(itemSchema).min(1),

  total: z
    .string()
    .regex(/^\d+\.\d{2}$/)
    .transform((val) => parseFloat(val)),
});

export type Item = z.infer<typeof itemSchema>;
export type Receipt = z.infer<typeof receiptSchema>;
