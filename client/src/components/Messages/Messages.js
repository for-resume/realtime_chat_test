import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages, name, selectMessage, selectedMessageId }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, index) => (
      <div key={index}>
        <Message
          message={message}
          name={name}
          selectMessage={selectMessage}
          selectedMessageId={selectedMessageId}
        />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
