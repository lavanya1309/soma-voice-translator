import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';

const Dashboard = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8);
    socket.emit('create_room', newRoomId);
    navigate(`/room/${newRoomId}`);
  };

  const joinRoom = () => {
    if (roomId.trim()) {
      navigate(`/room/${roomId}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Hello, {username || 'User'}</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">New Meeting</h2>
          <button
            onClick={createRoom}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Room
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Join Meeting</h2>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={joinRoom}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
