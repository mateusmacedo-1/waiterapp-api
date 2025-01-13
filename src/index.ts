import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { router } from './router';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    pingInterval: 10000,
    pingTimeout: 5000,
})

io.on('connection', (socket) => {
    console.log(`Socket conectado: ${socket.id}`);
    const originalEmit = socket.emit;
    socket.emit = function (event, ...args) {
        console.log(`Emiting event ${event} ${args[0]}`);
        return originalEmit.apply(socket, [event, ...args]);
    };
    io.on('disconnect', (reason) => {
        console.log(`Socket desconectado: ${socket.id} - ${reason}`);
        io.removeAllListeners();
    });
});




mongoose.connect('mongodb://localhost:27017')
    .then(() => {
        console.log('Connected to MongoDB');

        const port = 3001;

        app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
        app.use(express.json())
        app.use(router);
        server.listen(port, '192.168.0.108', () => {
            console.log(`${Date.now()}: Server is running on port http://localhost:${port}`);
        });


    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error);
    });

