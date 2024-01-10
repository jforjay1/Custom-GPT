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
        "assistant_id": "asst_fn1mScWvslVRhZ92YGibKtCW"
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v1'
        }
      }
    );

    console.log("Execution completed, strting to fetch the response");

    const checkInterval = setInterval(async () => {
      try {
        const runStatus = await axios.get(
          `${OPENAI_API_URL}/threads/${threadId}/runs`,
          {
            headers: {
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
              'OpenAI-Beta': 'assistants=v1'
            }
          }
        );
        console.log(JSON.stringify(runStatus.data));
    
        if (runStatus.data.data.status === 'completed') {
          console.log("COMPLETED EXECUTION STARTING TO FETCH THE RESPONSES");
          clearInterval(checkInterval);
    
          // Fetch messages once the run is completed
          const messagesResponse = await axios.get(
            `${OPENAI_API_URL}/threads/${threadId}/messages`,
            {
              headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
                'OpenAI-Beta': 'assistants=v1'
              }
            }
          );
    
          res.json({ messages: messagesResponse.data.data });
        }
      } catch (error) {
        console.error('Error checking run status:', error);
      }
    }, 2000);
  } catch (error) {
    console.error('Error sending message outside:', error);
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