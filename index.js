const experss = require("express")
const app = experss()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors : {
    origin : "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// (1) socket.connection 연결하기 
io.on("connection", (socket)=> {
  console.log(socket.io);

          // (3) socket.emit 내용보내기

          // (4) socket.on 내용보내기


          

  // (2) socket.disconnected 연결해제
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  })

})

server.listen(3001, ()=> {
  console.log("SERVER RUNNING");
})