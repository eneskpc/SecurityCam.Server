import * as express from "express";
import * as http from "http";
import { AddressInfo } from "net";
import * as WebSocket from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.getUniqueID = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + "-" + s4();
};

wss.on("connection", (ws: WebSocket) => {
  ws.uid = wss.getUniqueID();
  ws.on("message", (message: string) => {
    wss.clients.forEach((client) => {
      client.send(client.uid + " said that" + message);
    });
  });
});

server.listen(process.env.PORT || 8999, () => {
  console.log(
    `Server started on port ${(server.address() as AddressInfo).port} :)`
  );
});
