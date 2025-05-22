import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8001})

interface User {
    socket: WebSocket;
    room: string
}

let allSockets: User[] = []
wss.on("connection", function(socket){
    socket.on("message", (message)=>{
        const parsedMessage = JSON.parse(message as unknown as string)
        console.log(parsedMessage)
        if(parsedMessage.type === "join"){
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
        else if(parsedMessage.type === "chat"){
            let currentUserRoom = null;
            for(let i=0; i<allSockets.length; i++){
                if(allSockets[i].socket == socket){
                    currentUserRoom = allSockets[i].room
                }
            }
            for(let i=0; i<allSockets.length; i++){
                if(currentUserRoom == allSockets[i].room){
                    if(!(allSockets[i].socket == socket)){
                        allSockets[i].socket.send(parsedMessage.payload.message)

                    }
                   
                }
            }
            
        }
    })
    socket.on("disconnect", () => {
        allSockets = allSockets.filter(x => x.socket !== socket);
    });
})