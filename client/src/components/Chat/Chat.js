import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { Redirect } from 'react-router';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState('');
  const ENDPOINT = 'https://react-socketio-realtime-chat.herokuapp.com';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, error => {
      if (error) {
        alert(error);
        setError(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on('messageRemoved', id => {
      setMessages(messages => [...messages.filter(mes => mes.id !== id)]);
    });

    socket.on('messageEdited', ({ id, text }) => {
      setMessages(messages => {
        const newMessages = [...messages];
        for (let mes of newMessages) {
          if (mes.id === id) {
            mes.text = text;
            mes.edited = true;
          }
        }
        return newMessages;
      });
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const selectMessage = id => {
    setSelectedMessageId(id);
    const message = messages.filter(mes => mes.id === id);
    setMessage(message[0].text);
  };

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  const editMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit('editMessage', { selectedMessageId, message }, () => {
        setMessage('');
        setSelectedMessageId('');
      });
    } else {
      socket.emit('removeMessage', selectedMessageId, () => {
        setMessage('');
        setSelectedMessageId('');
      });
    }
  };

  return (
    <React.Fragment>
      {error ? (
        <Redirect to={`/rooms?name=${name}`} />
      ) : (
        <div className="outerContainer">
          <div className="container">
            <InfoBar room={room} name={name} />
            <Messages
              messages={messages}
              name={name}
              selectMessage={selectMessage}
              selectedMessageId={selectedMessageId}
            />
            <Input
              selectedMessageId={selectedMessageId}
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
              editMessage={editMessage}
            />
          </div>
          <TextContainer users={users} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Chat;
