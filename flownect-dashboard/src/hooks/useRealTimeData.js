import { useState, useEffect, useCallback } from 'react';
import { connectWebSocket, disconnectWebSocket } from '../services/websocket';

const useRealTimeData = (channel = 'dashboard') => {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);

  const handleMessage = useCallback((message) => {
    try {
      const parsedData = JSON.parse(message.data);
      setData(parsedData);
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  }, []);

  const handleConnect = useCallback(() => {
    setConnected(true);
  }, []);

  const handleDisconnect = useCallback(() => {
    setConnected(false);
  }, []);

  useEffect(() => {
    const ws = connectWebSocket(channel, {
      onMessage: handleMessage,
      onConnect: handleConnect,
      onDisconnect: handleDisconnect
    });

    return () => {
      disconnectWebSocket(ws);
    };
  }, [channel, handleMessage, handleConnect, handleDisconnect]);

  return { data, connected };
};

export default useRealTimeData;