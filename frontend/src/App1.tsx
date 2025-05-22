// import { useEffect, useRef, useState } from "react";
// type Message = {
//   text: string;
//   type: "sent" | "receive"
// };


// function App() {
  
//   const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const messageEndRef = useRef<HTMLDivElement | null>(null);
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   function sendMessage() {
//     if (!socket || !inputRef.current) {
//       return;
//     }
//     const message = inputRef.current.value;
//     socket.send(message);
//     setMessages((prev) => [...prev, { text: message, type: "sent" }]);
//     inputRef.current.value = " ";
//   }

//   //code for recieving what server sent
//   useEffect(() => {
//     const ws = new WebSocket("ws://localhost:8000");
//     setSocket(ws);
//     ws.onmessage = (event) => {
//       // alert(event.data)
      

//       setTimeout(() => {
//         setMessages((prev) => [
//           ...prev,
//           { text: event.data, type: "receive" },
//         ]);
//       }, 2000);
//     };
//     // return ()=>{
//     //   ws.close()
//     // }
//   }, []);
//   useEffect(() => {
//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   return (
//     <>
//       <div className="w-screen h-screen flex justify-center items-center text-white">
//         <div className="w-96 h-80 relative flex justify-center bg-blue-200 rounded-md p-2">
//           <div
//             className="flex-1 overflow-auto mb-2 h-[85%]"
//             style={{ maxHeight: "300px", overflowY: "auto" }}
//           >
//             {messages &&
//               messages.map((msg, index) => (
//                 <>
//                   <div>
//                     <p
//                       key={index}
//                       className={`p-2 my-1 rounded w-fit ${
//                         msg.type === "sent"
//                           ? "bg-blue-400 self-end justify-self-end"
//                           : "bg-blue-800 self-start"
//                       }`}
//                     >
//                       {msg.type === "receive" && (
//                         <i className="ri-account-circle-line  mr-2"></i>
//                       )}
//                       <span>{msg.text}</span>

//                       {msg.type === "sent" && (
//                         <i className="ri-account-circle-line ml-2"></i>
//                       )}
//                     </p>
//                   </div>
//                 </>
//               ))}
//             <div ref={messageEndRef} />
//           </div>
//           <div className="absolute bottom-0 w-full">
//             <input
//               className="px-3 py-2 rounded-md outline-none bg-[#111827] w-[80%] text-white"
//               ref={inputRef}
//               type="text"
//               placeholder="message"
//             />
//             <button
//               className="bg-blue-600 px-5 py-2 rounded "
//               onClick={sendMessage}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
