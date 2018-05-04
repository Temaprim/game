import React from 'react';
import {soundManager} from 'soundmanager2';

import './TurnButton.css'
import {socket} from '../../App';


class TurnButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        socket.emit('turn', this.props.button.id);
        this.playSound();
    };
    //добавляет звук при клике на кнопки
    playSound() {
        soundManager.createSound({
            id: 'clickSound',
            url: '/mp3/click.mp3'
        });
        soundManager.play('clickSound');
    }

    render() {
        const button = this.props.button;
        const buttonId = button.id;
        const icon = "fa " + button.icon + " fa-stack-1x";
        //изменяет размер кнопок, в зависимости от ширины экрана,
        //используется для адаптивности на маленьких экранах
        let iconSize = window.innerWidth > 990 ? 'fa-3x' : 'fa-2x';
        console.log(window.innerWidth);
        return (
            <div id={buttonId} className="game-button" onClick={this.handleClick}>
                    <span className={'fa-stack ' + iconSize}>
		  		        <i className="fa fa-circle-thin fa-stack-2x"></i>
		  	        	<i className={icon}></i>
		        	</span>
            </div>
        );
    }
}

export default TurnButton;