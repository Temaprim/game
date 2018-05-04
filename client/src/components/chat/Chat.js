import React from 'react';
import {soundManager} from 'soundmanager2';

import './Chat.css';
import {socket} from '../../App';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: ['Добро пожаловать!']
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.writeEvent = this.writeEvent.bind(this);
    }

    //отправляет сообщение из формы на сервер
    onFormSubmit(e) {
        e.preventDefault();
        const input = document.getElementById('chat');
        const text = input.value;
        input.value = '';
        socket.emit('message', text);
        this.playSound();
    }

    //проигрывает звук при отправке сообщения
    playSound() {
        soundManager.createSound({
            id: 'messageSound',
            url: '/mp3/message.mp3'
        });
        soundManager.play('messageSound');
    }

    componentDidMount() {
        socket.on('message', this.writeEvent);
    }

    componentWillUnmount() {
        socket.off('message');
    }

    writeEvent(text) {
        const currentMessages = this.state.messages;
        const newMessages = currentMessages.concat(text);
        this.setState({messages: newMessages});

        const parent = document.querySelector('#events');
        // прокручивает чат к новым сообщениям
        parent.scrollTop = parent.scrollHeight;﻿
    }

    render() {
        let chatMessages = [];
        this.state.messages.forEach(message => {
            chatMessages.push(
                <li>{message}</li>
            )
        });

        return (
            <div className="chatbox">
                <ul id="events">
                    {chatMessages}
                </ul>
                <form id="chat-form" onSubmit={this.onFormSubmit}>
                    <input id="chat" autoComplete="off" title="chat"/>
                    <button id="say">Отправить</button>
                </form>
            </div>
        );
    }
}

export default Chat;