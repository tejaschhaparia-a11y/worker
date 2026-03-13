import express from "express";
import fetch from "node-fetch"; // ya Cloudflare AI SDK

const app = express();
app.use(express.json());

const CF_API_KEY = process.env.CF_API_KEY; // secret key

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    // 🔹 Cloudflare AI API fetch
    const response = await fetch("https://api.cloudflare.com/ai/run", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "@cf/black-forest-labs/flux-1-schnell",
        prompt
      })
    });

    const arrayBuffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server running"));
