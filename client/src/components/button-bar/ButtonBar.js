import React from 'react';

import TurnButton from "../turn-button/TurnButton";
import './ButtonBar.css';

class ButtonBar extends React.Component {
    render() {
        const turnButtons = [];
        const BUTTONS = [
            {id: 'rock', icon: 'fa-hand-rock-o'},
            {id: 'paper', icon: 'fa-hand-paper-o'},
            {id: 'scissors', icon: 'fa-hand-scissors-o'},
            {id: 'lizard', icon: 'fa-hand-lizard-o'},
            {id: 'spock', icon: 'fa-hand-spock-o'}
        ];

        BUTTONS.forEach(btn => {
            turnButtons.push(
                <TurnButton key={btn.id} button={btn}/>
            );
        });

        return (
            <div className="buttons-container">
                {turnButtons}
            </div>
        );
    }
}

export default ButtonBar;