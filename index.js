import express from 'express';
import fetch from 'node-fetch';
import { Vibrant } from 'node-vibrant';

const app = express();
app.use(express.json());

app.post('/palette', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: "imageUrl is required!" });
    }

    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    const palette = await Vibrant.from(buffer).getPalette();
    const colors = Object.values(palette)
      .map(swatch => swatch ? swatch.getHex() : null)
      .filter(Boolean);

    res.json({ colors });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Palette API running on port ${port}`));
