import { Server } from 'ws';
import { evaluateRule } from '../rules/services';

const wss = new Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const { rule, data } = JSON.parse(message.toString());
    const result = evaluateRule(rule, data);
    ws.send(JSON.stringify({ result }));
  });
});

console.log('WebSocket server is running on ws://localhost:8080');