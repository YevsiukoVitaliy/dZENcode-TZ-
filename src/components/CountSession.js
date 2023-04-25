import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function CountSession() {
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    const socket = io('http://localhost:4000');

    socket.on('update sessions', sessions => {
      setSessions(sessions);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <span
        style={{
          position: 'absolute',
          top: '15px',
          right: '0',
        }}
      >
        {sessions}
      </span>
    </>
  );
}

export default CountSession;
