const experss = require("express");
const app = experss();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// (1) socket.connection 연결하기 // 연결되면, 연결된 정보를 노드콘솔에 기록하기
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  console.log("Token received:", socket.handshake.auth.authorization); // 사용자정보 -> DB

  // (1-1) 룸 정보 연결하기 
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  // (1-2) socket.emit 내용보내기
  socket.on("send_message", (data) => {
    socket.to(data.chatNum).emit("receive_message", {...data, id:socket.id});
  });

    // (1-3) socket.disconnected 연결해제
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});




