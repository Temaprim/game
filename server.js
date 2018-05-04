const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const RpslsGame = require('./rpsls-game');

//хранит все доступные Id
let sessions ={};

//генерерует уникальное шестизначное число
function generateSessionId() {
    return Math.floor(Math.random()*900000) + 100000;
}


io.on('connection', (socket) => {
    let id = generateSessionId();
    sessions[id] = socket;
    socket.emit('player-connected', id);
    console.log('Connected user with id ' + id);

    //перенаправляет на страницу с игрой, когда второй игрок перешел по ссылке
    socket.on('player2-connected', (id) => {
        if(sessions[id]) {
            sessions[id].emit('redirect');
            new RpslsGame(socket, sessions[id]);
        }
    });

    socket.on('message', (text) => {
        io.emit('message', text);
    });

    //ощищает id из объекта при разрыве соедениения с игроком
    socket.on('disconnect', function(){
        console.log('user disconnected');
        delete sessions[id];
    });
});

const port = 5000;

http.listen(port, () => console.log(`Server started on port ${port}`));

