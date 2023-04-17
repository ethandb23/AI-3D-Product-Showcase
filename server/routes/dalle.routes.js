import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi} from 'openai';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// Middleware for authorization
const requireAuth = (req, res, next) => {
  const api_key = req.headers['authorization'];
  if (api_key === process.env.OPENAI_API_KEY) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" })
})

router.route('/').post(requireAuth, async (req, res) => {
  try {
    const { prompt } = req.body;

    const API_URL = 'https://api.openai.com/v1/images/generations';
    const API_KEY = process.env.OPENAI_API_KEY;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'image-alpha-001',
        prompt,
        size: '1024x1024',
        response_format: 'url'
      })
    });

    const data = await response.json();
    const image_url = data.data[0].url;

    res.status(200).json({ photo: image_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }
})

export default router;
