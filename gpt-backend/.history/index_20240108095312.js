const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  
  // Replace this with the actual request to your ChatGPT model
  try {
    // Simulating a response from ChatGPT for demonstration
    const chatGPTResponse = `Echo: ${userMessage}`;

    res.json({ response: chatGPTResponse });
  } catch (error) {
    console.error('Error communicating with ChatGPT:', error);
    res.status(500).send('Error communicating with ChatGPT');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));