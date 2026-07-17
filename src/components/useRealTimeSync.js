import { useEffect, useRef } from 'react';

/**
 * A hook to sync state in real-time using WebSockets.
 * @param {Function} onMessage - Callback when a real-time event occurs.
 */
export default function useRealTimeSync(onMessage) {
  const savedCallback = useRef(onMessage);

  useEffect(() => {
    savedCallback.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    // Determine WebSocket URL based on protocol (http -> ws, https -> wss)
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    // If the Vite client is running on port 5173, point the WebSocket to port 5000 (Express) on the same hostname
    const host = window.location.port === '5173'
      ? `${window.location.hostname}:5000`
      : window.location.host;
    const wsUrl = `${protocol}//${host}`;

    let socket;
    let reconnectTimeout;
    let isMounted = true;

    function connect() {
      if (!isMounted) return;
      
      console.log('Connecting to Sharan Estates real-time sync...');
      socket = new WebSocket(wsUrl);

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (savedCallback.current) {
            savedCallback.current(data);
          }
        } catch (e) {
          console.error('Error parsing WebSocket sync payload:', e);
        }
      };

      socket.onclose = () => {
        if (isMounted) {
          console.log('Sharan Estates real-time sync offline. Reconnecting in 5 seconds...');
          reconnectTimeout = setTimeout(connect, 5000);
        }
      };

      socket.onerror = (err) => {
        console.error('Sharan Estates real-time sync connection error:', err);
      };
    }

    connect();

    return () => {
      isMounted = false;
      if (socket) {
        socket.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, []);
}
