import React from 'react';

import Gameboard from "../gameboard/Gameboard";
import Chat from "../chat/Chat";
import './game.css';
import {socket} from '../../App';

class Game extends React.Component {
    componentDidMount(){
        //извлекает id из URL
        let id = window.location.pathname.substr(3,9);
        //проверяет флаг, что соединение уже было утановленно,
        //необходимо для избежания повторного соединения с тем же игроком
        let isAlreadyConnected = window.location.search.substr(1,5);
        if(!isAlreadyConnected){
            socket.emit('player2-connected', id);
        }
    }

    render() {
        return (
            <div className="wrapper-game">
                <Gameboard/>
                <Chat/>
            </div>
        );
    }
}

export default Game;