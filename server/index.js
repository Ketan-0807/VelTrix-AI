import dotenv from "dotenv";
import express from "express";
import { GoogleGenAI } from "@google/genai";
import { basePrompt as nodeBasePrompt } from "./src/defaults/node.js";
import { basePrompt as reactBasePrompt } from "./src/defaults/react.js";
import { BASE_PROMPT } from "./src/prompt.js";
import cors from "cors";
import router from "./src/routes/router.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_CONNECTION_STRING, )
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const routes = router;

const PORT = process.env.PORT || 3000;

export const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API,
});

app.get("/", (req, res) => {
  res.send("Server is up");
});

// middleware
app.use("/", routes);

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
