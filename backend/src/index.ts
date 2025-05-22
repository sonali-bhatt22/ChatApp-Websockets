import { WebSocketServer, WebSocket } from "ws";
import http from "http"

// Create an HTTP server with a basic response for health checks
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('OK');
});

// Create a basic HTTP server (needed for Render)

const wss = new WebSocketServer({ server });

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


// ✅ Listen on the port Render provides
const PORT = Number(process.env.PORT) || 8001;
server.listen({ port: PORT, host: '0.0.0.0' }, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

