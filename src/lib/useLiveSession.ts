"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  LiveSessionState,
  LiveHostAction,
  LivePlayerAction,
} from "@/types/live";

interface UseLiveSessionOptions {
  pin: string | null;
  hostToken?: string | null;
  playerId?: string | null;
  isHost?: boolean;
}

export function useLiveSession({
  pin,
  hostToken,
  playerId,
  isHost = false,
}: UseLiveSessionOptions) {
  const [state, setState] = useState<LiveSessionState | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fallback polling function
  const fetchStateSnapshot = useCallback(async () => {
    if (!pin) return;
    try {
      const res = await fetch(`/api/live?pin=${pin}&isHost=${isHost}`);
      if (res.ok) {
        const data = await res.json();
        setState(data);
        setConnected(true);
      }
    } catch {
      // ignore
    }
  }, [pin, isHost]);

  useEffect(() => {
    if (!pin) {
      setState(null);
      setConnected(false);
      return;
    }

    let isMounted = true;

    // Connect via Server-Sent Events (SSE)
    const streamUrl = `/api/live?pin=${pin}&stream=true&isHost=${isHost}`;
    const es = new EventSource(streamUrl);
    eventSourceRef.current = es;

    es.onopen = () => {
      if (isMounted) {
        setConnected(true);
        setError(null);
      }
    };

    es.onmessage = (event) => {
      if (!isMounted) return;
      try {
        const data: LiveSessionState = JSON.parse(event.data);
        setState(data);
      } catch (err) {
        console.error("SSE parse error", err);
      }
    };

    es.onerror = () => {
      // If SSE errors (e.g. strict corporate proxy or transient network switch), start polling fallback
      if (isMounted) {
        setConnected(false);
        if (!pollingIntervalRef.current) {
          pollingIntervalRef.current = setInterval(fetchStateSnapshot, 1500);
        }
      }
    };

    // Also do an immediate initial fetch
    fetchStateSnapshot();

    return () => {
      isMounted = false;
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [pin, isHost, fetchStateSnapshot]);

  // Host Action Dispatcher
  const sendHostAction = useCallback(
    async (hostAction: LiveHostAction) => {
      if (!pin || !hostToken) return false;
      try {
        const res = await fetch("/api/live", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "host_action",
            pin,
            hostToken,
            hostAction,
          }),
        });
        const result = await res.json();
        if (result.state) {
          setState(result.state);
        }
        return result.success;
      } catch (e: any) {
        setError(e.message || "Erreur de transmission");
        return false;
      }
    },
    [pin, hostToken]
  );

  // Player Action Dispatcher
  const sendPlayerAction = useCallback(
    async (playerAction: LivePlayerAction) => {
      if (!pin || !playerId) return false;
      try {
        const res = await fetch("/api/live", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "player_action",
            pin,
            playerId,
            playerAction,
          }),
        });
        const result = await res.json();
        return result.success;
      } catch (e: any) {
        setError(e.message || "Erreur de réponse");
        return false;
      }
    },
    [pin, playerId]
  );

  return {
    state,
    connected,
    error,
    sendHostAction,
    sendPlayerAction,
    refresh: fetchStateSnapshot,
  };
}
