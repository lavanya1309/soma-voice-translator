import React, { useState, useEffect } from 'react';
import { socket } from '../socket';

const Chat = ({ roomId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message_received', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('message_received');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const msgObj = {
        roomId,
        text: message,
        sender: 'You',
        time: new Date().toLocaleTimeString()
      };
      socket.emit('send_message', msgObj);
      setMessages(prev => [...prev, msgObj]);
      setMessage('');
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="h-64 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>{msg.sender}: </strong>
            <span>{msg.text}</span>
            <small className="text-gray-500 ml-2">{msg.time}</small>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-2 border rounded-l"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
