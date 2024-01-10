const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_URL = 'https://api.openai.com/v1'; // Update to Assistants API endpoint
const OPENAI_API_KEY = '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'; // Use environment variable for API key


// Endpoint to create a Thread and add a message
app.post('/sendMessage', async (req, res) => {
    console.log('Received request:', req.body);
    const userPrompt = req.body.message;
    console.log('Received prompt from user:', userPrompt);
    const assistantId = 'asst_fn1mScWvslVRhZ92YGibKtCW';

  try {
    // Create a new Thread
    const threadResponse = await axios.post(
      `${OPENAI_API_URL}/threads`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v1'
        }
      }
    );

    const threadId = threadResponse.data.id;
    console.log(threadId);

    // Add a message to the Thread
    await axios.post(
      `${OPENAI_API_URL}/threads/${threadId}/messages`,
      {
        role: "user",
        content: userPrompt
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v1'
        }
      }
    );
    console.log("Message added and starting to run the thread");

    // Run the Assistant
    const runResponse = await axios.post(
      `${OPENAI_API_URL}/threads/${threadId}/runs`,
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v1'
        }
      },
      {
        data:{
          'assistant_id': `${assistantId}`
        }
      }
    );

    res.json({ threadId: threadId, runId: runResponse.data.id });

    res.json({ threadId: threadId});
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error sending message');
  }
});

// Endpoint to get the Assistant's response
app.get('/getResponse', async (req, res) => {
  const { threadId } = req.query;

  try {
    const response = await axios.get(
      `${OPENAI_API_URL}/threads/${threadId}/messages`,
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ messages: response.data.data });
  } catch (error) {
    console.error('Error getting response:', error);
    res.status(500).send('Error getting response');
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));