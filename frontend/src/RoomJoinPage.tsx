import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function RoomJoinPage() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomId.trim() !== "") {
      navigate(`/chat/${roomId}`); // Redirect to ChatRoom
    }
  };
  return (
    <div className=" shadow-xl  rounded-3xl w-96 h-72 justify-center items-center flex">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-semibold m-auto">Join a Chat Room 💬</h1>

          <div>
            <input
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3694bc] transition-all  p-2 rounded mr-3"
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <button
              className="bg-[#3694bc] text-white py-2 rounded-md px-4 hover:bg-[#3694bcd3]"
              onClick={handleJoin}
            >
              Join
            </button>
          </motion.button>
          </div>
          <p className="italic text-slate-500 m-auto">Enter a valid room ID to start chatting!</p>
        </div>
      </motion.div>
    </div>
  );
}
export default RoomJoinPage;
