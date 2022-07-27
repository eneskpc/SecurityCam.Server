import * as express from "express";
import * as http from "http";
import { AddressInfo } from "net";
import * as WebSocket from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    ws.send(message);
  });
});

server.listen(process.env.PORT || 8999, () => {
  console.log(
    `Server started on port ${(server.address() as AddressInfo).port} :)`
  );
});
