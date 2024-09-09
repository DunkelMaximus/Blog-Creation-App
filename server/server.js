import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectToDB from "./lib/db.js";
import userRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
