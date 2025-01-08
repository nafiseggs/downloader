const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS

app.get('/download', async (req, res) => {
  try {
    const videoUrl = req.query.url;
    if (!videoUrl) {
      return res.status(400).send('URL is required');
    }

    const response = await axios.post('https://snap-video3.p.rapidapi.com/download', 
    new URLSearchParams({
      url: videoUrl
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-rapidapi-host': 'snap-video3.p.rapidapi.com',
        'x-rapidapi-key': 'c430b8ecfbmsh1fb735a97be99a5p198e4bjsnd8ce5972748f',
      }
    });

    // Get the first download link and send it as plain text
    const downloadLink = response.data.medias && response.data.medias[0]?.url;
    if (downloadLink) {
      return res.send(downloadLink); // Send the URL directly
    } else {
      return res.status(500).send('Download link not found');
    }

  } catch (error) {
    console.error('Error fetching video:', error);
    return res.status(500).send('Error fetching video');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
