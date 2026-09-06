import { useEffect, useRef, useState, useCallback } from 'react';
import { wsURL } from '../services/api.js';

// Connects to our backend's relay WebSocket (/ws) and calls onMessage for
// every parsed event. The backend forwards the ML API's telemetry stream
// plus its own session lifecycle events - see useSimulation.js for how
// each event type is applied to UI state. Reconnects automatically with
// backoff. Exposes a status string: 'connecting' | 'live' | 'offline'.
export function useWebSocket(onMessage) {
  const [status, setStatus] = useState('connecting');
  const socketRef = useRef(null);
  const retryDelay = useRef(1000);
  const retryTimer = useRef(null);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const connect = useCallback(() => {
    let socket;
    try {
      socket = new WebSocket(wsURL());
    } catch (err) {
      setStatus('offline');
      scheduleRetry();
      return;
    }
    socketRef.current = socket;
    setStatus('connecting');

    socket.onopen = () => {
      setStatus('live');
      retryDelay.current = 1000;
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessageRef.current?.(data);
      } catch (err) {
        // ignore malformed frames
      }
    };

    socket.onerror = () => {
      socket.close();
    };

    socket.onclose = () => {
      setStatus('offline');
      scheduleRetry();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scheduleRetry() {
    clearTimeout(retryTimer.current);
    retryTimer.current = setTimeout(() => {
      retryDelay.current = Math.min(retryDelay.current * 1.6, 15000);
      connect();
    }, retryDelay.current);
  }

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(retryTimer.current);
      socketRef.current?.close();
    };
  }, [connect]);

  return { status };
}
