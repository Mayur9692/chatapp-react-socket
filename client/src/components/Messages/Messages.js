import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom'

import Message from '../Message/Message.js';

import './Messages.css'

const Messages = ({ messages, name }) => (
    <ScrollToBottom className="messages">
        {/* {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)} */}
        {messages.map((message) => (
            <div key={message.id}>
                <Message message={message} />
            </div>
        ))}
    </ScrollToBottom>
);

export default Messages;