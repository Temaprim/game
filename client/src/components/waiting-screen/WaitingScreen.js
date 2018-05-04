import React from 'react';
import {Redirect} from 'react-router-dom'


import './WaitingScreen.css';
import {socket} from '../../App';


class WaitingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isRedirected: false};
    }

    //выделение всей ссылки при нажатии
    SelectText(element) {
        let doc = document,
            text = doc.getElementById(element),
            range, selection;
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    componentDidMount() {
        socket.on('redirect', () => {
            this.setState({isRedirected: true});
        });
    }

    componentWillUnmount() {
        socket.off('redirect');
    }

    render() {
        return (
            <div className="container">
                {/*перенаправляет ко второму игроку, если он подключился*/}
                {this.state.isRedirected && <Redirect to={'/id' + this.props.id + '?start'}/>}
                <h1 className="heading">Камень, Ножницы, Бумага, Ящерица, Спок!</h1>

                <div className="content">
                    <div className="link-container">
                        <div id="invite-link" onClick={this.SelectText.bind(this, 'invite-link')}>
                            {'localhost:3000/id' + this.props.id}
                        </div>
                        <div>Поделитесь ссылкой, чтобы начать игру</div>
                    </div>

                    <div className="description">
                        <span className="rule-title">Правила игры:</span>
                        <p>
                            Ножницы режут бумагу, бумага покрывает камень, камень давит ящерицу,
                            ящерица отравляет Спока, Спок ломает ножницы, ножницы обезглавливают ящерицу,
                            ящерица съедает бумагу, бумага подставляет Спока, Спок испаряет камень, и как
                            всегда, камень разбивает ножницы.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default WaitingScreen;
