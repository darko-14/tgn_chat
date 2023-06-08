const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });   

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})


io.on('connection',  (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data);
        io.to(socket.id).emit("hi");
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
})


server.listen('3001', () => {
    console.log('server is running...')
})