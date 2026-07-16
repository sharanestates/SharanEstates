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
    const host = window.location.hostname === 'localhost' ? 'localhost:5000' : window.location.host;
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
          console.log('Sharan Estates real-time sync offline. Reconnecting in 3 seconds...');
          reconnectTimeout = setTimeout(connect, 3000);
        }
      };

      socket.onerror = (err) => {
        console.error('Sharan Estates real-time sync error:', err.message);
        socket.close();
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
