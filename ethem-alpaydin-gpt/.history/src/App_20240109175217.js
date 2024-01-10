import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      console.log('Sending message:', message);
      const result = await axios.post('http://localhost:5001/sendMessage', { message: message }).catch((error) => {
        console.log(error);
      });
      
      setResponse(result.data.messages);
      console.log('Message received!', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat with GPT</h1>
        <div className="chat-container">
          <textarea
            className="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
          />
          <button className="send-button" onClick={sendMessage}>Send</button>
          <div className="response-area">
            <p>{response}</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;