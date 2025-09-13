const WS_URL = process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8001';

let wsConnection = null;
let reconnectTimeout = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

export const connectWebSocket = (channel, callbacks = {}) => {
  const { onMessage, onConnect, onDisconnect, onError } = callbacks;

  try {
    wsConnection = new WebSocket(`${WS_URL}/${channel}`);

    wsConnection.onopen = () => {
      console.log('WebSocket connected');
      reconnectAttempts = 0;
      if (onConnect) onConnect();
    };

    wsConnection.onmessage = (message) => {
      if (onMessage) onMessage(message);
    };

    wsConnection.onclose = () => {
      console.log('WebSocket disconnected');
      if (onDisconnect) onDisconnect();
      attemptReconnect(channel, callbacks);
    };

    wsConnection.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (onError) onError(error);
    };

    return wsConnection;
  } catch (error) {
    console.error('Failed to create WebSocket connection:', error);
    return null;
  }
};

const attemptReconnect = (channel, callbacks) => {
  if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
    reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
    
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts})`);
    
    reconnectTimeout = setTimeout(() => {
      connectWebSocket(channel, callbacks);
    }, delay);
  }
};

export const disconnectWebSocket = (ws = wsConnection) => {
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }
  
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close();
  }
  
  wsConnection = null;
  reconnectAttempts = 0;
};

export const sendMessage = (message) => {
  if (wsConnection && wsConnection.readyState === WebSocket.OPEN) {
    wsConnection.send(JSON.stringify(message));
    return true;
  }
  console.warn('WebSocket is not connected');
  return false;
};