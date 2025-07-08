import express from 'express';
import fetch from 'node-fetch';
import Vibrant from 'node-vibrant/lib/bundle.js'; // obrati pažnju na .js na kraju ako deployuješ na railway!

const app = express();
app.use(express.json());

app.post('/palette', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    const palette = await Vibrant.from(buffer).getPalette();
    const colors = Object.values(palette)
      .map(swatch => (swatch ? swatch.getHex() : null))
      .filter(Boolean);

    res.json({ colors });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8080, () => console.log('Palette API running on port 8080'));
