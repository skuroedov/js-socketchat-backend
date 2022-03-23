import * as express from "express";

const app = express();
app.set("port", process.env.PORT || 3001);

let http = require("http").Server(app);
let io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

interface IMessage {
  username: string;
  text: string;
}

io.on("connection", function(socket: any) {
  socket.on("clientMsg", (data: IMessage) => {
    console.log(`${data.username}: ${data.text}`);
    io.emit("finalMsg", data);
  });
});


const server = http.listen(3001, function() {
  console.log("listening on *:3001");
});