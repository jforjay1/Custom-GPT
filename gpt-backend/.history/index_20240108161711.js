const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Adjusted to match the OpenAPI spec
app.post('/promptCustomModel', async (req, res) => {
  console.log('Received request:', req.body);
  const userPrompt = req.body.prompt;  // Adjusted to match the expected field in the OpenAPI spec
  console.log('Received prompt from user:', userPrompt);

  // Replace this with the actual request to your ChatGPT model
  try {
    // Simulating a response from ChatGPT for demonstration
    const chatGPTResponse = `Echo: ${userPrompt}`;

    res.json({ response: chatGPTResponse });
  } catch (error) {
    console.error('Error communicating with ChatGPT:', error);
    res.status(500).send('Error communicating with ChatGPT');
  }
});

// Optional: Implement the model response retrieval endpoint
app.get('/modelResponse', (req, res) => {
  // Logic to retrieve and send back the model's response
  // This depends on how you store and manage the responses
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));