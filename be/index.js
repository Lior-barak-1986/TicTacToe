// const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { findAvailableRoom, joinRoom, findUserRoom, announceToRoom, removeUserFromRoom } = require("./src/controller/rooms");
const { checkWin } = require('./src/controller/game');

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

io.on('connection', socket => {
    socket.on('user-connected', () => {
        joinRoom(findAvailableRoom(), socket);
    });
    socket.on("move", (board, round) => {
        const winner = checkWin(round, board);
        socket.emit('player-moved', board, round, false, winner);
        announceToRoom(findUserRoom(socket.id), socket, 'player-moved', board, round, true, winner)
    })
    socket.on("reset", () => {
        announceToRoom(findUserRoom(socket.id), socket, 'game-reset', true);
        socket.emit('game-reset', false);
    })
    socket.on("disconnect", (reason) => {
        console.log(reason);
        const roomNum = findUserRoom(socket.id);
        removeUserFromRoom(roomNum, socket.id)
        announceToRoom(roomNum, socket, 'player-left', false);
    });
});

io.listen(8000);