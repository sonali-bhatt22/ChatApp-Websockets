import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import Rooms from "./Rooms";

type Message = {
  text: string;
  type: "sent" | "receive";
};

function ChatRoom() {
  const { roomId } = useParams<{ roomId: string }>();

  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatVisible, setChatVisible] = useState(false);

  function sendMessage() {
    if (!socket || !inputRef.current) {
      return;
    }
    const mess = inputRef.current.value.trim(); // 🧼 Remove whitespace
    if (mess === "") return;
    const message = inputRef.current.value;
    socket.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: message,
        },
      })
    );
    setMessages((prev) => [...prev, { text: message, type: "sent" }]);
    inputRef.current.value = "";
  }
  const handleKeyPress = (event: { key: string; shiftKey: any }) => {
    if (event.key === "Enter" && !event.shiftKey) {
      sendMessage(); // Trigger send message
    }
  };

  //code for recieving what server sent
  useEffect(() => {
    const backendUrl =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:8001";
    const wsUrl = backendUrl.replace(/^http/, (match: string) =>
      match === "https" ? "wss" : "ws"
    );
    const ws = new WebSocket(wsUrl);

    // const ws = new WebSocket("ws://localhost:8001");
    setSocket(ws);
    ws.onmessage = (event) => {
      // alert(event.data)
      setTimeout(() => {

      setMessages((prev) => [...prev, { text: event.data, type: "receive" }]);
      }, 2000);
    };
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: roomId,
          },
        })
      );
    };
    // return ()=>{
    //   ws.close()
    // }
  }, []);
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {/* <ChatRoom/> */}
      <div className="w-screen h-screen flex flex-col sm:flex-row  text-white">
        <div className="sm:w-[20%] w-full bg-zinc-50">
          {/* "I know for sure roomId is not undefined, so stop complaining." */}
          <Rooms roomId={roomId!} onClick={() => setChatVisible(true)} />
        </div>
        {chatVisible && (
          <div className="sm:w-[80%] w-full h-screen bg-zinc-100 rounded-md p-2 flex flex-col">
            <div className="bg-black hidden sm:block h-[6%] w-full py-2 px-4 rounded">
              <h1 className="font-semibold">Welcome to chat <span className="text-yellow-300 font-bold">{roomId} 🤪</span></h1>
            </div>

            <div className="container px-2 flex-1 overflow-auto mt-2">
              {messages &&
                messages.length > 0 &&
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex my-1 ${
                      msg.type === "sent" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex items-center">
                      
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className={`py-2 px-3 ${
                          msg.type === "sent" ? "bg-[#3694bc] " : "bg-gray-600"
                        } bg-[#0369a1] text-white rounded max-w-80 break-words`}
                      >
                        {msg.text}
                      </motion.div>
                      
                    </div>
                  </div>
                ))}
              <div ref={messageEndRef} />
            </div>

            <div className="w-full flex gap-2 mt-2">
              <input
                className="px-3 py-3 rounded-md outline-none bg-[#111827] flex-1 text-white"
                ref={inputRef}
                type="text"
                placeholder="message"
                enterKeyHint="enter"
                onKeyDown={handleKeyPress}
              />
              <button className="rounded" onClick={sendMessage}>
                <img
                  className="w-10 h-10 rounded"
                  src="https://media.istockphoto.com/id/1290684294/vector/send-message-icon.jpg?s=612x612&w=0&k=20&c=8vwd4PDMzEELKMUrTQ7LZnpngAN5Bzs55sRJ09sA8FU="
                  alt=""
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatRoom;
