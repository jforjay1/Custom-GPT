import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo192.png'; // Path to your logo image
import userIcon from './profile.png';

function App() {
  const [showProfile, setShowProfile] = useState(false);
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
        <img src={logo} alt="Company Logo" className="company-logo" />
        <h1>Chat with GPT</h1>
        <div className="user-section">
          <img 
            src={userIcon} 
            alt="User Icon" 
            className="user-icon" 
            onClick={() => setShowProfile(!showProfile)} 
          />
          {showProfile && (
            <div className="profile-dropdown">
              <p>User Profile Info</p>
              {/* Add more user info here */}
            </div>
          )}
        </div>
      </header>
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
      <footer className="App-footer">
        <p>© 2024 by Jay Patel. Designed by Jay Patel.</p>
        <a href="/privacy-policy">Privacy Policy</a> | <a href="/contact-us">Contact Us</a>
      </footer>
    </div>
  );
}

export default App;