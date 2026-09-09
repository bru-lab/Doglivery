import "dotenv/config";

import express from 'express';
import userRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import cartRoutes from './routes/cart.route.js';
import orderRoutes from './routes/order.route.js';
import cors from 'cors';

import path from 'path';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT;
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}


connectDB();

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});