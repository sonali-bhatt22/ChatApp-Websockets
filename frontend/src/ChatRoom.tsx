import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react"
import Rooms from "./Rooms";


type Message = {
  text: string;
  type: "sent" | "receive"
}


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
    const message = inputRef.current.value;
    socket.send(JSON.stringify({
        type: "chat",
        payload: {
            message: message
        }
    }));
    setMessages((prev) => [...prev, { text: message, type: "sent" }]);
    inputRef.current.value = " ";
    
  }
  const handleKeyPress=(event)=>{
    if (event.key === 'Enter' && !event.shiftKey) {
       
        sendMessage(); // Trigger send message
      }
  }

  //code for recieving what server sent
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8001");
    setSocket(ws);
    ws.onmessage = (event) => {
      // alert(event.data)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: event.data, type: "receive" },
        ]);
      }, 2000);
    };
    ws.onopen=()=>{
        ws.send(JSON.stringify({
            type: "join",
            payload:{
                roomId: roomId
            }
        }))
    }
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
      <div className="w-screen h-screen flex  text-white">
        <div className="w-[20%] bg-blue-100"><Rooms roomId={roomId!} onClick={()=>setChatVisible(true)}/></div>
  {chatVisible && <div className="w-[80%] h-screen bg-blue-200 rounded-md p-2 flex flex-col">
    
    <div className="bg-black h-[6%] w-full py-1 px-4 rounded">
      chatRoom: {roomId}
    </div>

    <div className="container flex-1 overflow-auto mt-2">
      {messages &&
        messages.map((msg, index) => (
          <div
            key={index}
            className={`flex my-1 ${msg.type === "sent" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-center">
              {msg.type === "receive" && (
                <i className="ri-account-circle-line mr-2"></i>
              )}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-2 bg-blue-500 text-white rounded-lg"
              >
                {msg.text}
              </motion.div>
              {msg.type === "sent" && (
                <i className="ri-account-circle-line ml-2"></i>
              )}
            </div>
          </div>
        ))}
      <div ref={messageEndRef} />
    </div>

    <div className="w-full flex gap-2 mt-2">
      <input
        className="px-3 py-2 rounded-md outline-none bg-[#111827] flex-1 text-white"
        ref={inputRef}
        type="text"
        placeholder="message"
        enterKeyHint="enter"
        onKeyDown={handleKeyPress}
      />
      <button className="bg-blue-600 px-2 py-2 rounded" onClick={sendMessage}>
        Send
      </button>
    </div>

  </div>}
</div>


    </>
  );
}

export default ChatRoom;
