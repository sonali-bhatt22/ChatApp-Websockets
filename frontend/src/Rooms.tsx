type RoomsProps = {
  roomId: string;
   onClick: () => void;
};

const Rooms = ({roomId, onClick}:RoomsProps) => {

  return (
    <div onClick={onClick} className=" bg-blue-500 flex flex-col gap-3 p-3">
        <span className="text-lg font-bold">Chatrooms</span>
        <div  className="bg-black p-3">{roomId}</div>
    </div>
  );
};

export default Rooms;
