# Real time broadcast chat app
1. what the user can send

> join a room
{
    "type": "join",
    "payload": {
        "roomId": "123"
    }
}
> Send a Message 
{
    "type": "chat",
    "payload": {
        "message": "hi there"
    }
}
2. What the Server can send/User recieves
> Message
{
    "type": "chat",
    "payload": {
        "message" : "hi there"
    }
}
json.stringy() convert json data to string
json.parse() conver string into object

# for making a chat app with rooms
iske liye hume allsocket jo ki sbhi sockets ko manage kr rha tha ab hume vo nhi chiye

hume chiye ki hum ek array banaenge use array jisme socket or room hoga

interface user {
    socket: WebSocket
    room: string
}
it is an array of user which storing the room and socket  
let allSockets: User[] = []

