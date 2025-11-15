import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const transcribeAndRespond = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No audio uploaded" });

    const filePath = req.file.path;
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));
    form.append("model", "whisper-1");

    const whisperResp = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const transcript =
      whisperResp.data.text || whisperResp.data.transcript || "";

    // 2) Send transcript to OpenAI ChatCompletion to get assistant reply
    const chatResp = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // choose appropriate model or gpt-4o, gpt-4 etc.
        messages: [
          { role: "system", content: "You are a helpful voice assistant." },
          { role: "user", content: transcript },
        ],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const assistantText =
      chatResp.data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't think of a reply.";

    // cleanup uploaded file
    fs.unlinkSync(filePath);

    // 3) Return transcript + assistant reply
    res.json({
      transcript,
      assistant: assistantText,
    });
  } catch (err) {
    console.error("transcribe error:", err.response?.data || err.message);
    res.status(500).json({
      message: "Transcription error",
      error: err.response?.data || err.message,
    });
  }
};
