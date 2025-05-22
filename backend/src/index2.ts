import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 }, () => {
  console.log('WebSocket server is running on ws://localhost:8080');
});

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('message', (message: string) => {
    console.log(`Received: ${message}`);

    if (message.toString() === 'ping') {
      ws.send('pong');
      console.log('Sent: pong');
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
