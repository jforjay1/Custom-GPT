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
    await axios.post(
      `${OPENAI_API_URL}/${ASSISTANT_ID}/threads/${threadId}/runs`,
      {},
      { headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` } }
    );

    // Retrieve the response
    setTimeout(async () => {
      try {
        const messagesResponse = await axios.get(
          `${OPENAI_API_URL}/${ASSISTANT_ID}/threads/${threadId}/messages`,
          { headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` } }
        );

        const assistantMessages = messagesResponse.data.data.filter(message => message.role === 'assistant');
        if (assistantMessages.length > 0) {
          const latestResponse = assistantMessages[assistantMessages.length - 1].content;
          res.json({ response: latestResponse });
        } else {
          res.json({ response: 'No response from assistant yet.' });
        }
      } catch (innerError) {
        console.error('Error retrieving response:', innerError);
        res.status(500).send('Error retrieving response');
      }
    }, 5000); // Delay to wait for the assistant to process the message

  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).send('Error processing message');
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
