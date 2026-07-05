import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRouter.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

connectDB();

//api endpoint 

app.use("/api/food",foodRouter)

app.get("/", (req, res) => {
  res.send("API WORKING");
});



app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});