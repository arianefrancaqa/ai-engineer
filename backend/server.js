import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import OpenAI from "openai";
import fetch from "node-fetch"; // For fetching stock data

dotenv.config(); // Load environment variables

const app = express();
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON body

// OpenAI API Client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// 📌 Backend API for OpenAI Chat
app.post("/chat", async (req, res) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: req.body.messages,
        });

        res.json({ message: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500).json({ error: "Failed to fetch OpenAI response" });
    }
});

// 📌 Backend API for Stock Data
app.get("/stocks/:ticker", async (req, res) => {
    const { ticker } = req.params;
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-01/2023-01-04?apiKey=${process.env.POLYGON_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Stock API Error:", error);
        res.status(500).json({ error: "Failed to fetch stock data" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
