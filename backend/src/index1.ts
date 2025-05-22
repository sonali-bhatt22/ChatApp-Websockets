
import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({port: 8000})

let allSockets: WebSocket[] = []

wss.on("connection", function(socket){
    allSockets.push(socket);
    // console.log(allSockets)

    socket.on("message", (message)=>{
        console.log(message)
        for(let i=0; i < allSockets.length; i++){
            if(!(allSockets[i] == socket)){
                const s = allSockets[i]
                s.send(message.toString())
            }
        }
    })
    socket.on("disconnect", ()=>{
        allSockets = allSockets.filter(x=> x !== socket)
    })

})


    // socket.on("message", (message)=>{
    //     const parsedMessage = JSON.parse(message as unknown as string);
    //     if(parsedMessage.type == "join"){
    //         allSockets.push({
    //             socket,
    //             room: parsedMessage.payload.roomId
    //         })

    //     }
    //     if(parsedMessage.type == "chat"){
    //         let currentUserRoom = null;
    //         for(let i =0; i< allSockets.length; i++){
    //             if(allSockets[i].socket == socket){
    //                 currentUserRoom = allSockets[i].room
    //             }
    //         }
    //         for(let i=0; i< allSockets.length; i++){
    //             if(allSockets[i].room == currentUserRoom){
    //                 allSockets[i].socket.send(parsedMessage.payload.message)
    //             }

    //         }


    //     }

    // })
    
    // socket.on("disconnect", ()=>{
    //     allSockets = allSockets.filter(x=> x !== socket)
    // })


// wss.on("connection", (socket)=>{
//     allSockets.push(socket)  
//     console.log(`user connected`)

//     socket.on("message", (event)=>{
//         const message = event.toString()
//         console.log(message)
//         for(let i=0; i < allSockets.length; i++){
//             const s = allSockets[i]
//             s.send(message)
//         }

//     })
//     socket.on("disconnect", ()=>{
//         allSockets = allSockets.filter(x=> x !== socket)
//     })
// })
