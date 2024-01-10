import OpenAIApi from openai;
const express = require('express');
const openai = require("openai");
const Configuration = openai.Configuration;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const configuration = new Configuration({
  apiKey: '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', // Set your API key in environment variables
});
const openai = new OpenAIApi(configuration);


app.post('/sendMessage', async (req, res) => {
  console.log('Received request:', req.body);
  const userPrompt = req.body.message;
  console.log('Received prompt from user:', userPrompt);
  const assistantId = 'asst_fn1mScWvslVRhZ92YGibKtCW';

  // Endpoint to create a Thread and Run the Assistant
  app.post('/promptCustomModel', async (req, res) => {
    try {
      // Create a new Thread
      const threadResponse = await openai.createThread();
      const threadId = threadResponse.data.id;

      // Add a message to the Thread
      await openai.createMessage(threadId, {
        role: "user",
        content: userPrompt
      });

      // Run the Assistant
      const runResponse = await openai.createRun(threadId, {
        assistant_id: req.body.assistant_id,
        instructions: req.body.instructions || null
      });

      res.json({ threadId, runId: runResponse.data.id });
    } catch (error) {
      console.error('Error in promptCustomModel:', error);
      res.status(500).send('Error in promptCustomModel');
    }
  });

  // Endpoint to get the Assistant's response
  app.get('/modelResponse', async (req, res) => {
    try {
      const messagesResponse = await openai.listMessages(req.query.threadId);
      res.json(messagesResponse.data);
    } catch (error) {
      console.error('Error getting response:', error);
      res.status(500).send('Error getting response');
    }
  });


});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));