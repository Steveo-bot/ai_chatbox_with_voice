import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import chat from "./chat.js";
import chatMCP from "./chat-mcp.js";

dotenv.config();

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

const PORT = 5001;

let filePath;

app.post("/upload", upload.single("file"), (req, res) => {
  filePath = req.file.path;
  res.send(filePath + "uploaded successfully");
});

app.get("/chat", async (req, res) => {
  try {
    if (!filePath) {
      return res.status(400).send({
        ragAnswer: "No PDF uploaded yet.",
        mcpAnswer: "No PDF uploaded yet.",
      });
    }

    const ragResp = await chat(filePath, req.query.question);
    const mcpResp = await chatMCP(req.query.question);

    res.send({
      ragAnswer: ragResp.text,
      mcpAnswer: mcpResp.text,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);
    res.status(500).send({
      ragAnswer: `Server error: ${error.message}`,
      mcpAnswer: `Server error: ${error.message}`,
    });
  }
});

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});