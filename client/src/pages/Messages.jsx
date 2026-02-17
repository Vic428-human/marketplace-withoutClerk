import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-react";

const fakeMessages = [
  {
    id: 1742100123000,
    sender: "系統",
    text: "歡迎來到競拍大廳！請遵守規則，理性出價～",
    ts: 1742100123000,
  },
];

const Messages = () => {
  const { user, isLoaded } = useUser(); // ✅ 加 isLoaded（避免 user undefined 時就連線）
  const [messages, setMessages] = useState(fakeMessages);
  const [text, setText] = useState("");
  const [connected, setConnected] = useState(false);

  const [typingUsers, setTypingUsers] = useState([]);
  const typingTimersRef = useRef(new Map());

  const clerkName =
    (user?.username && user.username.trim()) ||
    (user?.primaryEmailAddress?.emailAddress?.split("@")[0] ?? "").trim() ||
    (user?.id ?? "");

  const showNamePopUp = !isLoaded || !user || !clerkName;

  // WebSocket instance
  const wsRef = useRef(null);

  // ✅ avoid closure issue in onmessage
  const userNameRef = useRef("");
  useEffect(() => {
    userNameRef.current = clerkName;
  }, [clerkName]);

  const typingStopTimerRef = useRef(null);

  function connectWS(name) {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

    const finalName = (name || "anonymous").trim() || "anonymous";

    const ws = new WebSocket(
      `ws://localhost:3000/ws?name=${encodeURIComponent(finalName)}`,
    );

    ws.onopen = () => {
      setConnected(true);
      console.log("✅ Connected");
    };

    ws.onmessage = (e) => {
      let ev;
      try {
        ev = JSON.parse(String(e.data));
      } catch {
        return;
      }

      if (!ev || !ev.type) return;

      // don't show my own typing / echo
      if (ev.name === userNameRef.current) return;

      if (ev.type === "chat") {
        setMessages((prev) => [
          ...prev,
          {
            id: (ev.ts ?? Date.now()) + Math.random(),
            sender: ev.name ?? "unknown",
            text: ev.text ?? "",
            ts: ev.ts ?? Date.now(),
          },
        ]);
        return;
      }

      if (ev.type === "typing") {
        const name = ev.name;
        if (!name) return;

        const timers = typingTimersRef.current;
        const old = timers.get(name);
        if (old) clearTimeout(old);

        if (ev.typing) {
          setTypingUsers((prev) =>
            prev.includes(name) ? prev : [...prev, name],
          );

          const t = setTimeout(() => {
            setTypingUsers((prev) => prev.filter((n) => n !== name));
            timers.delete(name);
          }, 2500);

          timers.set(name, t);
        } else {
          setTypingUsers((prev) => prev.filter((n) => n !== name));
          timers.delete(name);
        }
      }
    };

    ws.onclose = () => {
      setConnected(false);
      console.log("🔌 Disconnected");
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket error", err);
    };

    wsRef.current = ws;
  }

  // ✅ 1) 用 Clerk 自動決定名字 + 自動連線 + 關閉 popup
  useEffect(() => {
    if (!isLoaded) return;
    if (!user) return;
    if (!clerkName) return;

    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      connectWS(clerkName);
    }
  }, [isLoaded, user, clerkName]);

  const formatTime = (ts) => {
    const d = new Date(ts);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const sendTyping = (isTyping) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: "typing", typing: isTyping }));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const localMsg = {
      id: Date.now(),
      sender: clerkName,
      text: trimmed,
      ts: Date.now(),
    };
    setMessages((prev) => [...prev, localMsg]);

    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      sendTyping(false);
      ws.send(JSON.stringify({ type: "chat", text: trimmed }));
    } else {
      console.warn("WS not connected");
    }

    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(e);
    }
  };

  useEffect(() => {
    return () => {
      try {
        wsRef.current?.close();
      } catch {}

      if (typingStopTimerRef.current) clearTimeout(typingStopTimerRef.current);

      for (const t of typingTimersRef.current.values()) {
        clearTimeout(t);
      }
      typingTimersRef.current.clear();
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-4 font-inter">
      {/* ✅ 這段 popup 你可以直接整段刪掉。
          最小改動：保留但永遠不會顯示（因為 user ready 後會 setShowNamePopUp(false)） */}
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
                      : `${typingUsers.slice(0, 2).join("、")} 等 ${
                          typingUsers.length
                        } 人正在輸入…`}
                  </span>
                )}
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <span className="font-medium text-[#303030] capitalize">
                {clerkName || "anonymous"}
              </span>
            </div>
          </div>

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

          <form
            onSubmit={sendMessage}
            className="border-t border-gray-200 bg-white p-3 flex gap-2"
          >
            <input
              value={text}
              onChange={(e) => {
                const v = e.target.value;
                setText(v);

                if (!connected) return;

                sendTyping(true);

                if (typingStopTimerRef.current)
                  clearTimeout(typingStopTimerRef.current);

                typingStopTimerRef.current = setTimeout(() => {
                  sendTyping(false);
                }, 1200);
              }}
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
        </div>
      )}
    </div>
  );
};

export default Messages;

export const Route = createFileRoute("/Messages")({
  component: Messages,
});
