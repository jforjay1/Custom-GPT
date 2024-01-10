const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const openai = require('openai');

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// OpenAI API setup
const OPENAI_API_KEY = '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'; // Replace with your OpenAI API key
openai.apiKey = OPENAI_API_KEY;

// Assistant ID
const ASSISTANT_ID = 'asst_fn1mScWvslVRhZ92YGibKtCW'; // Replace with your Assistant ID

// Endpoint to receive message from frontend and send to OpenAI
app.post('/sendMessage', async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log('Received message:', userMessage);

    // Create a Thread
    const thread = await openai.beta.threads.create();

    // Add a Message to a Thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: userMessage
    });

    // Run the Assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID
    });

    // Retrieve the run to check status
    const completedRun = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    // Check the Run status and get the response
    if (completedRun.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(thread.id);
      const assistantResponse = messages.data.find(m => m.role === 'assistant');
      res.send({ response: assistantResponse.content });
    } else {
      res.send({ response: "The assistant is still processing the request." });
    }
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).send({ error: 'Error processing message' });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
