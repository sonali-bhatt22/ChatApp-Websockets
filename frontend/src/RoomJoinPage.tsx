import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"

function RoomJoinPage() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomId.trim() !== '') {
      navigate(`/chat/${roomId}`);  // Redirect to ChatRoom
    }
  };
  return (
    <div className=' bg-blue-200 rounded w-96 h-80 justify-center items-center flex'>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2}}
    >
      <div className='flex-col'>
      <h2 className='text-xl font-bold'>Join a Chat Room</h2> 
      
      <input className='bg-blue-950 text-white p-2 rounded mr-3'
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <motion.button 
     
      
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
<button className='bg-blue-950 text-white py-1 rounded-md px-4 hover:bg-blue-800' onClick={handleJoin}>Join</button>
</motion.button>
      
      </div>
      
    </motion.div>
      
    </div>
  );
}
export default RoomJoinPage;
