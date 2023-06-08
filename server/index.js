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

let online_users = []


io.on('connection',  (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data.room);
        io.to(socket.id).emit("hi");
        online_users.push({
            id: socket.id,
            user: data.user
        })
        console.log(`User with ID: ${socket.id} joined room: ${data.room}`);
        console.log('online_users', online_users)
        socket.to(data.room).emit("return_online_users", online_users);
    });

    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        online_users = online_users.filter(v => v.id !== socket.id)
        console.log('online_users', online_users)
        console.log("User Disconnected", socket.id);
    });
})


server.listen('3001', () => {
    console.log('server is running...')
})