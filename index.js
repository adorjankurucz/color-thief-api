const express = require('express');
const fetch = require('node-fetch');
const ColorThief = require('colorthief');

const app = express();
app.use(express.json());

app.post('/palette', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    // Get dominant color
    const dominantColor = await ColorThief.getColor(buffer);
    // Get palette (5 colors)
    const palette = await ColorThief.getPalette(buffer, 5);

    res.json({ dominantColor, palette });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Palette API running on port', port));
