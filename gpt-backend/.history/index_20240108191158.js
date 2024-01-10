const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';  // OpenAI endpoint
const OPENAI_API_KEY = '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'; // Set your API key in environment variables

app.post('/promptCustomModel', async (req, res) => {
  console.log('Received request:', req.body);
  const userPrompt = req.body.message;
  console.log('Received prompt from user:', userPrompt);

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-4-1106-preview",  // Replace with your chosen model
        messages: [{ "role": "user", "content": userPrompt }]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ response: response.data.choices[0].message['content'] });
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