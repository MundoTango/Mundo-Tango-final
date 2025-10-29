import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { queryClient } from '@/lib/queryClient';

/**
 * WebSocket hook for real-time updates
 * Connects to server WebSocket and listens for agent/task updates
 */
export function useWebSocket() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Connect to WebSocket server
    const socket = io(window.location.origin, {
      transports: ['websocket', 'polling']
    });

    socketRef.current = socket;

    // Listen for agent updates
    socket.on('agent-update', () => {
      // Invalidate agent queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
    });

    // Listen for task updates
    socket.on('task:created', () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
    });

    socket.on('task:updated', () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
    });

    // Listen for agent collaboration messages
    socket.on('agent:collaboration', () => {
      queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
    });

    // Connection events
    socket.on('connect', () => {
      console.log('[WebSocket] Connected');
    });

    socket.on('disconnect', () => {
      console.log('[WebSocket] Disconnected');
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return socketRef.current;
}

/**
 * Subscribe to specific agent updates
 */
export function useAgentSubscription(agentId?: string) {
  const socket = useWebSocket();

  useEffect(() => {
    if (socket && agentId) {
      socket.emit('subscribe-agent', agentId);
    }
  }, [socket, agentId]);

  return socket;
}
