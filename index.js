const express = require('express');
const fetch = require('node-fetch');
const Vibrant = require('node-vibrant').default; // OVO je KLJUČNO!

const app = express();
app.use(express.json());

app.post('/palette', async (req, res) => {
  try {
    const { imageUrl } = req.body;
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

app.listen(8080, () => console.log('Palette API running on port 8080'));
