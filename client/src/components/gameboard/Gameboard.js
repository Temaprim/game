import React from 'react';

import ButtonBar from "../button-bar/ButtonBar";
import "./Gameboard.css";
import {socket} from '../../App';

class Gameboard extends React.Component {
    //показывает изображение игрового персонажа в окне
    showImg(char, position) {
        let parent = document.getElementById('board');
        const img = document.createElement('img');
        img.src = './img/' + char + '.png';
        img.classList.add("character");

        if (position == 'right') {
            img.style.right = '0';
        }
        img.style.opacity = 0;
        parent.appendChild(img);
        img.style.display = "block";
        //функция для плавного появления изображения
        (function fade() {
            let val = parseFloat(img.style.opacity);
            if (!((val += .1) > 1)) {
                img.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
        //удаляет изображения из DOM в конце хода
        setTimeout(() => {
            parent.removeChild(img);
        }, 2500);
    }

    componentDidMount() {
        //добавляет выбранные изображения персонажей
        socket.on('show-result-img', turns => {
            this.showImg(turns[0], 'left');
            this.showImg(turns[1], 'right');
        });
    }

    componentWillUnmount() {
        socket.off('show-result-img');
    }

    render() {
        return (
            <div className="wrapper-gameboard">
                <div id="board">
                    <video className="video-wrap" autoPlay loop>
                        <source src="./video/space.mp4" type="video/mp4"/>
                    </video>
                </div>
                <ButtonBar/>
            </div>
        );
    }
}

export default Gameboard;