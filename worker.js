import express from "express";
import fetch from "node-fetch"; // Node 18+ me built-in fetch bhi use kar sakte ho

const app = express();
app.use(express.json());

// 🔐 Secret API key (direct use kiya aapka key)
const CF_API_KEY = "20fe8vUzBz98PTpH0reUP-VxsFYTvohIZLiLHwEf";

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    // 🔹 Cloudflare AI API call (Flux 1 Schnell)
    const response = await fetch("https://api.cloudflare.com/ai/run", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "@cf/black-forest-labs/flux-1-schnell",
        prompt
      })
    });

    // 🔹 Convert result to binary for image
    const arrayBuffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Access-Control-Allow-Origin", "*"); // frontend fetch allow
    res.send(Buffer.from(arrayBuffer));

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
