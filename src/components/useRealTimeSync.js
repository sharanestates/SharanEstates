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
    const isLocal = window.location.hostname === 'localhost' ||
                    window.location.hostname === '127.0.0.1' ||
                    window.location.hostname.startsWith('192.168.') ||
                    window.location.hostname.startsWith('10.') ||
                    window.location.hostname.startsWith('172.');
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = isLocal ? `${window.location.hostname}:5000` : window.location.host;
    const wsUrl = `${protocol}//${host}`;

    let socket;
    let reconnectTimeout;
    let isMounted = true;
    let hasConnected = false;

    function connect() {
      if (!isMounted) return;
      
      socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        hasConnected = true;
        console.log('Connected to Sharan Estates real-time sync.');
      };

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
          if (hasConnected) {
            console.log('Sharan Estates real-time sync disconnected. Reconnecting in 10 seconds...');
            hasConnected = false;
          }
          reconnectTimeout = setTimeout(connect, 10000);
        }
      };

      socket.onerror = () => {
        // Suppress custom console.error here. The browser naturally prints a network error to console if connection fails.
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
