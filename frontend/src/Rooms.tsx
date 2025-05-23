type RoomsProps = {
  roomId: string;
   onClick: () => void;
};

const Rooms = ({roomId, onClick}:RoomsProps) => {

  return (
    <div onClick={onClick} className=" bg-[#3694bcac] flex flex-col gap-1 p-1 sm:gap-3 sm:p-3">
        <span className="text-lg font-semibold">Chatrooms</span>
        <div  className="bg-black rounded sm:p-3 p-2">{roomId}</div>
    </div>
  );
};

export default Rooms;
