import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css'
import InfoBar from '../InfoBar/Infobar.js';
import Input from '../Input/Input.js'
import Messages from '../Messages/Messages.js';

let socket;

const Chat = () => {
  const [ name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {
      // Handle successful join if needed
    });

    // Add a log to check the socket connection status
    console.log("Socket connected:", socket.connected);

    return () => {
      socket.disconnect(); // Use disconnect() instead of emit('disconnected..')
    }
  }, [ENDPOINT, window.location.search]);


  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
  }, [messages])



  //function for sending messages...........
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  console.log(message, messages);
  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} />
        <Messages messages={messages} />

        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>

    </div>
  );
};

export default Chat;
