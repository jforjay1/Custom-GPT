import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      console.log('Sending message:', message);
      const result = await axios.post('http://localhost:6000/chat', { message });
      setResponse(result.data.response);
      console.log('Message sent!', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat with GPT</h1>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button onClick={sendMessage}>Send</button>
        <p>Response: {response}</p>
      </header>
    </div>
  );
}

export default App;