import { NextRequest, NextResponse } from "next/server";
import { liveSessionStore, getPublicState } from "@/lib/liveSessionStore";
import { LiveHostAction, LivePlayerAction } from "@/types/live";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "create") {
      const { weekId = "week-10", timerSeconds = 20, questionCount = 10 } = body;
      const result = liveSessionStore.createSession({
        weekId,
        timerSeconds,
        questionCount,
      });
      return NextResponse.json(result);
    }

    if (action === "join") {
      const { pin, playerName, avatar } = body;
      if (!pin) {
        return NextResponse.json({ error: "Code PIN requis" }, { status: 400 });
      }
      const result = liveSessionStore.joinSession(pin, playerName, avatar);
      if ("error" in result) {
        return NextResponse.json({ error: result.error }, { status: 404 });
      }
      return NextResponse.json(result);
    }

    if (action === "host_action") {
      const { pin, hostToken, hostAction } = body as {
        pin: string;
        hostToken: string;
        hostAction: LiveHostAction;
      };
      if (!pin || !hostToken || !hostAction) {
        return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
      }
      const result = liveSessionStore.handleHostAction(pin, hostToken, hostAction);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json(result);
    }

    if (action === "player_action") {
      const { pin, playerId, playerAction } = body as {
        pin: string;
        playerId: string;
        playerAction: LivePlayerAction;
      };
      if (!pin || !playerId || !playerAction) {
        return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
      }
      const result = liveSessionStore.handlePlayerAction(pin, playerId, playerAction);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
  } catch (err: any) {
    console.error("API /api/live error:", err);
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pin = searchParams.get("pin");
  const isStream = searchParams.get("stream") === "true";
  const isHost = searchParams.get("isHost") === "true";

  if (!pin) {
    return NextResponse.json({ error: "Code PIN requis" }, { status: 400 });
  }

  const session = liveSessionStore.getSession(pin);
  if (!session) {
    return NextResponse.json({ error: "Session introuvable" }, { status: 404 });
  }

  // If simple snapshot requested
  if (!isStream) {
    return NextResponse.json(getPublicState(session, isHost));
  }

  // Server-Sent Events (SSE) Stream
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial state immediately
      const initial = getPublicState(session, isHost);
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(initial)}\n\n`));

      // Subscribe to session updates
      const unsubscribe = liveSessionStore.subscribe(pin, (newState) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(newState)}\n\n`));
        } catch {
          unsubscribe();
        }
      });

      // Heartbeat every 15s to keep connection alive through proxies
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: heartbeat\n\n`));
        } catch {
          clearInterval(heartbeat);
          unsubscribe();
        }
      }, 15000);

      req.signal.addEventListener("abort", () => {
        clearInterval(heartbeat);
        unsubscribe();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
