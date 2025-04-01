import express from "express";
import receiptRoutes from "./routes/receipt.routes";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use("/receipts", receiptRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
