const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_URL = 'https://api.openai.com/v1/assistants'; // Correct API endpoint
const OPENAI_API_KEY = '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'; // Use environment variable for API key
const ASSISTANT_ID = 'asst_fn1mScWvslVRhZ92YGibKtCW'; // Assistant ID

// Endpoint to process user message and get response from Assistant
app.post('/sendMessage', async (req, res) => {
  console.log('Received request:', req.body);
  const userPrompt = req.body.message;
  console.log('Received prompt from user:', userPrompt);

  try {
    // Create a new Thread
    const threadResponse = await axios.post(
      `${OPENAI_API_URL}/${ASSISTANT_ID}/threads`,
      {},
      { headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` } }
    );
    const threadId = threadResponse.data.id;

    // Add a message to the Thread
    await axios.post(
      `${OPENAI_API_URL}/${ASSISTANT_ID}/threads/${threadId}/messages`,
      { role: "user", content: userPrompt },
      { headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` } }
    );

    // Run the Assistant
    const runResponse = await axios.post(
      `${OPENAI_API_URL}/${ASSISTANT_ID}/threads/${threadId}/runs`,
      {},
      { headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` } }
    );
    const runId = runResponse.data.id; // Fetching the run ID

    // Check the run's status
    let runStatus = null;
    do {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before checking the status
      const runStatusResponse = await axios.get(
        `${OPENAI_API_URL}/${ASSISTANT_ID}/threads/${threadId}/runs/${runId}`,
        { headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` } }
      );
      runStatus = runStatusResponse.data.status;
    } while (runStatus !== 'succeeded');

    // Retrieve the response messages
    const messagesResponse = await axios.get(
      `${OPENAI_API_URL}/${ASSISTANT_ID}/threads/${threadId}/messages`,
      { headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` } }
    );

    const assistantMessages = messagesResponse.data.data.filter(message => message.role === 'assistant');
    const latestResponse = assistantMessages.length > 0 ? assistantMessages[assistantMessages.length - 1].content : 'No response from assistant yet.';
    res.json({ response: latestResponse });

  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).send('Error processing message');
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));