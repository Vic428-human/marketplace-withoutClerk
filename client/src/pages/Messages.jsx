import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";

const SYSTEM_MESSAGES = [
  {
    id: 1742100123000,
    sender: "系統",
    text: "歡迎來到競拍大廳！請遵守規則，理性出價～",
    ts: 1742100123000,
  },
];

/** ======================
 * Utils
 * ====================== */

function formatTime(ts) {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function getClerkName(user) {
  if (!user) return "anonymous";

  const username = (user.fullName || "").trim();
  return username || "anonymous";
}

// 防止 WebSocket 收到非 JSON
function safeParseEvent(data) {
  try {
    const ev = JSON.parse(String(data));
    if (!ev || typeof ev !== "object") return null;
    if (!ev.type) return null;
    return ev;
  } catch {
    return null;
  }
}

/** ======================
 * Hook: typing TTL 與 UI 完全分離、timer 管理集中、避免 memory leak
 * ====================== */
function useTypingUsersTTL(ttlMs = 2500) {
  const [typingUsers, setTypingUsers] = useState([]);
  const timersRef = useRef(new Map());

  const markTyping = useCallback(
    (name, isTyping) => {
      if (!name) return;

      const timers = timersRef.current;
      const old = timers.get(name);
      if (old) clearTimeout(old);

      if (isTyping) {
        setTypingUsers((prev) =>
          prev.includes(name) ? prev : [...prev, name],
        );

        const t = setTimeout(() => {
          setTypingUsers((prev) => prev.filter((n) => n !== name));
          timers.delete(name);
        }, ttlMs);

        timers.set(name, t);
      } else {
        setTypingUsers((prev) => prev.filter((n) => n !== name));
        timers.delete(name);
      }
    },
    [ttlMs],
  );

  const clearAll = useCallback(() => {
    for (const t of timersRef.current.values()) clearTimeout(t);
    timersRef.current.clear();
    setTypingUsers([]);
  }, []);

  return { typingUsers, markTyping, clearAll };
}

/** ======================
 * Hook: 連線、送訊息、typing、disconnect 都封裝
 * ====================== */
function useChatSocket({ name, urlBase }) {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState(SYSTEM_MESSAGES);

  const wsRef = useRef(null);
  const myNameRef = useRef(name);

  const {
    typingUsers,
    markTyping,
    clearAll: clearTyping,
  } = useTypingUsersTTL(2500);

  useEffect(() => {
    myNameRef.current = name;
  }, [name]);

  const disconnect = useCallback(() => {
    try {
      wsRef.current?.close();
    } catch {}
    wsRef.current = null;
    setConnected(false);
    clearTyping();
  }, [clearTyping]);

  const connect = useCallback(() => {
    if (!name) return;
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

    const finalName = (name || "anonymous").trim() || "anonymous";
    const ws = new WebSocket(
      `${urlBase}?name=${encodeURIComponent(finalName)}`,
    );

    ws.onopen = () => {
      setConnected(true);
      console.log("✅ Connected");
    };

    ws.onclose = () => {
      setConnected(false);
      console.log("🔌 Disconnected");
      // 斷線就把 typing 清乾淨（避免 UI 留殘影）
      clearTyping();
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket error", err);
    };

    /*
onmessage 是一個「延遲執行」的函式（不是 render 當下立刻跑）
它會捕捉建立當下的 name / markTyping / clearTyping / setMessages 等引用
如果 name 之後改了、或換了使用者，舊的 onmessage 可能還在用舊值
    */
    ws.onmessage = (e) => {
      const ev = safeParseEvent(e.data);
      if (!ev) return;

      // 讀最新的 name，避免「用舊 name 去判斷是不是自己訊息」，解決 closure 問題
      if (ev.name && ev.name === myNameRef.current) return;

      if (ev.type === "chat") {
        const msgText = ev.text ?? "";
        if (!msgText) return;

        setMessages((prev) => [
          ...prev,
          {
            id: (ev.ts ?? Date.now()) + Math.random(),
            sender: ev.name ?? "unknown",
            text: msgText,
            ts: ev.ts ?? Date.now(),
          },
        ]);
        return;
      }

      if (ev.type === "typing") {
        const who = ev.name;
        const isTyping = Boolean(ev.typing);
        markTyping(who, isTyping);
        return;
      }
    };

    wsRef.current = ws;
  }, [name, urlBase, markTyping, clearTyping]);

  const sendTyping = useCallback((isTyping) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: "typing", typing: isTyping }));
  }, []);

  const sendChat = useCallback(
    (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      // local echo
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: name,
          text: trimmed,
          ts: Date.now(),
        },
      ]);

      const ws = wsRef.current;
      if (ws && ws.readyState === WebSocket.OPEN) {
        sendTyping(false);
        ws.send(JSON.stringify({ type: "chat", text: trimmed }));
      } else {
        console.warn("WS not connected");
      }
    },
    [name, sendTyping],
  );

  // component unmount 清理
  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return {
    connected,
    messages,
    typingUsers,
    connect,
    disconnect,
    sendChat,
    sendTyping,
  };
}

/** ======================
 * UI Components : UI 拆成三個元件，分層設計
 * ====================== */
function ChatHeader({ user, clerkName, connected, typingUsers }) {
  const provider = user?.externalAccounts?.[0]?.provider || null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt="avatar"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-[#075e54] text-white text-lg font-semibold">
            {clerkName?.[0]?.toUpperCase() || "U"}
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="text-sm font-medium text-[#303030]">競拍大廳</div>
        <div className="text-xs text-gray-500">
          {connected ? "已連線" : "未連線"}
          {connected && typingUsers.length > 0 && (
            <span className="ml-2">
              ·{" "}
              {typingUsers.length === 1
                ? `${typingUsers[0]} 正在輸入…`
                : `${typingUsers.slice(0, 2).join("、")} 等 ${typingUsers.length} 人正在輸入…`}
            </span>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[#303030] capitalize">
            {clerkName || "anonymous"}
          </span>

          {provider && (
            <span className="text-[11px] px-2 py-[2px] rounded-full bg-gray-100 text-gray-500 capitalize">
              {provider}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function MessageList({ messages, clerkName }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-100 flex flex-col">
      {messages.map((m) => {
        const mine = m.sender === clerkName;
        return (
          <div
            key={m.id}
            className={`flex ${mine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[78%] p-3 my-2 rounded-[18px] text-sm leading-5 shadow-sm ${
                mine
                  ? "bg-green-500 text-white rounded-br-2xl"
                  : "bg-white text-[#303030] rounded-bl-2xl"
              }`}
            >
              <div className="break-words whitespace-pre-wrap mb-1">
                <span className="font-medium">{m.text}</span>
              </div>
              <div className="flex justify-between items-center mt-1 gap-16">
                <div className="text-[11px] font-bold">{m.sender}</div>
                <span className="text-[11px] text-gray-500 text-right">
                  {formatTime(m.ts)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Composer({ connected, value, onChange, onSend, onTyping }) {
  // 本地 typing debounce（你停 1.2 秒就送 typing:false）
  const stopTimerRef = useRef(null);

  const handleChange = (e) => {
    const v = e.target.value;
    onChange(v);

    if (!connected) return;

    onTyping(true);

    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    stopTimerRef.current = setTimeout(() => {
      onTyping(false);
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
      className="border-t border-gray-200 bg-white p-3 flex gap-2"
    >
      <input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={!connected}
        placeholder={connected ? "輸入訊息..." : "尚未連線"}
        className="flex-1 border border-gray-200 rounded-full px-4 py-2 outline-green-500 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={!connected}
        className="px-4 py-2 rounded-full bg-green-500 text-white font-medium disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}

/** ======================
 * Page Component
 * ====================== */
function Messages() {
  const { user, isLoaded } = useUser(); // sync loading
  const clerkName = useMemo(() => getClerkName(user), [user]);
  const showNamePopUp = !isLoaded || !user;

  const [text, setText] = useState("");

  const { connected, messages, typingUsers, connect, sendChat, sendTyping } =
    useChatSocket({
      name: clerkName,
      urlBase: "ws://localhost:3000/ws",
    });

  // 自動連線（只在 user ready 時）
  useEffect(() => {
    if (showNamePopUp) return;
    connect();
  }, [showNamePopUp, connect]);

  const handleSend = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendChat(trimmed);
    setText("");
  }, [text, sendChat]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-4 font-inter">
      {showNamePopUp && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/30 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h1 className="text-xl font-semibold">Connecting...</h1>
            <p className="text-sm text-gray-500 mt-1">
              正在使用你的 Clerk 帳號登入並連線聊天室
            </p>
          </div>
        </div>
      )}

      {!showNamePopUp && (
        <div className="w-full max-w-2xl h-[90vh] bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
          <ChatHeader
            user={user}
            clerkName={clerkName}
            connected={connected}
            typingUsers={typingUsers}
          />

          <MessageList messages={messages} clerkName={clerkName} />

          <Composer
            connected={connected}
            value={text}
            onChange={setText}
            onSend={handleSend}
            onTyping={sendTyping}
          />
        </div>
      )}
    </div>
  );
}

export default Messages;

export const Route = createFileRoute("/Messages")({
  component: Messages,
});
