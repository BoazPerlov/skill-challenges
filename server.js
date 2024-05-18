const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let challengeData = {
  title: 'Skill Challenge: XXX',
  failuresTarget: 'Y',
  successesTarget: 'B',
  failuresCount: 0,
  successesCount: 0,
};

wss.on('connection', (ws) => {
  ws.send(JSON.stringify(challengeData));

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    Object.assign(challengeData, data);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(challengeData));
      }
    });
  });
});

app.use(express.static(path.join(__dirname, 'public')));

server.listen(process.env.PORT || 8080, () => {
  console.log('Server is listening on port ' + (process.env.PORT || 8080));
});
