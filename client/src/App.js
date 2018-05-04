import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import io from 'socket.io-client';

import WaitingScreen from './components/waiting-screen/WaitingScreen';
import Game from "./components/game/game";

const socket = io('http://localhost:5000');


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: ''};
    }

    componentDidMount() {
        this.initSocket();
    }

    initSocket() {
        socket.on('player-connected', (id) => {
            this.setState({id});
        });
    };

    // рендерится компонент в зависимости от текушего URL
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/'
                           render={(props) => <WaitingScreen {...props} id={this.state.id}/>}
                    />
                    <Route exact path='/id:id' component={Game}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        );
    }
}

export default App;
export {socket};
