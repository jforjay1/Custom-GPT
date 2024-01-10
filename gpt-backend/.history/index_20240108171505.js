const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Set up OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Set your OpenAI API Key in environment variables
});
const openai = new OpenAIApi(configuration);

app.post('/promptCustomModel', async (req, res) => {
  console.log('Received request:', req.body);
  const userPrompt = req.body.prompt;
  console.log('Received prompt from user:', userPrompt);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // or the model of your choice
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: userPrompt
        }
      ]
    });

    res.json({ response: response.data.choices[0].message.content });
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