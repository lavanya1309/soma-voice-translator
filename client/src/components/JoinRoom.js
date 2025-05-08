import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';

const JoinRoom = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const joinRoom = () => {
    if (roomId.trim()) {
      socket.emit('join_room', { roomId });
      navigate(`/room/${roomId}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Join a Meeting</h2>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={joinRoom}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;
