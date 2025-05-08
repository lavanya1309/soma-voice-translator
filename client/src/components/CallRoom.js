import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../socket';
import Peer from 'simple-peer';

const CallRoom = () => {
  const { roomId } = useParams();
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(currentStream => {
        userVideo.current.srcObject = currentStream;
        setStream(currentStream);

        socket.emit('join_room', roomId);
        
        socket.on('user_joined', userId => {
          const peer = new Peer({ initiator: false, stream: currentStream, trickle: false });
          
          peer.on('signal', signal => {
            socket.emit('relay_signal', { signal, to: userId, roomId });
          });

          peersRef.current.push({ peer, userId });
          setPeers([...peersRef.current]);
        });

        socket.on('signal_received', ({ signal, from }) => {
          const peer = peersRef.current.find(p => p.userId === from);
          if (peer) peer.peer.signal(signal);
        });
      });

    return () => {
      socket.off('user_joined');
      socket.off('signal_received');
    };
  }, [roomId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Room: {roomId}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <video ref={userVideo} autoPlay muted className="w-full h-auto rounded-lg" />
        {peers.map((peer, index) => (
          <video key={index} autoPlay className="w-full h-auto rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default CallRoom;
