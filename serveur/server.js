const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*"}});

const tokenAutorises = ["token1", "token2"];

io.use((socket, next) => { const token = socket.hendshake.auth.token;
    if (!tokenAutorises.includes(token)) return next(new Error("Non autorisé"));
    next();
});

io.on("connection", (socket) => {
    console.log("Nouvelle connexion :", socket.id);
    
    socket.on("join-room", room => {
        socket.join(room);
    });

    socket.on("message", data => {
        io.to(data.to).emit("message", data);
    });

    socket.on("signal", data => {
        io.to(data.to).emit("signal", data);
    });

    socket.on("disconnect", () => {
        console.log("Déconnexion :", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Serveur en local sur http://localhost:3000");
});