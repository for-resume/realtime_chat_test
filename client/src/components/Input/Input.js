import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message, selectedMessageId, editMessage }) => (
  <form className="form">
    {selectedMessageId ? (
      <React.Fragment>
        <input
          className="input"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={event => (event.key === 'Enter' ? editMessage(event) : null)}
        />
        <button className="sendButton" onClick={event => editMessage(event)}>
          Edit
        </button>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <input
          className="input"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={event => (event.key === 'Enter' ? sendMessage(event) : null)}
        />
        <button className="sendButton" onClick={event => sendMessage(event)}>
          Send
        </button>
      </React.Fragment>
    )}
  </form>
);

export default Input;
