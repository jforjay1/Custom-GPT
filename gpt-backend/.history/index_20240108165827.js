const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace this with the actual endpoint URL of your custom model
const CUSTOM_MODEL_API_URL = 'https://chat.openai.com/gpts/editor/g-ieAmRUxmR';

app.post('/promptCustomModel', async (req, res) => {
  console.log('Received request:', req.body);
  const userPrompt = req.body.prompt;  // Adjusted to match the expected field in the OpenAPI spec
  console.log('Received prompt from user:', userPrompt);

  try {
    // Send the prompt to the custom model API
    const apiResponse = await axios.post(CUSTOM_MODEL_API_URL, { prompt: userPrompt });
    
    // Send back the response from the custom model API to the client
    res.json({ response: apiResponse.data });
  } catch (error) {
    console.error('Error communicating with the custom model API:', error);
    res.status(500).send('Error communicating with the custom model API');
  }
});

// Optional: Implement the model response retrieval endpoint
app.get('/modelResponse', (req, res) => {
  // Logic to retrieve and send back the model's response
  // This depends on how you store and manage the responses
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));