import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Lobby from './components/Lobby';
import Counter  from './components/Counter';
import Room from './components/Room';
import './App.css';

const App = () => {
    return (
        <Router>
            <NavMenu/>
            <Switch>
                <Route exact path='/' component={Lobby} />
                <Route path='/about' component={Counter} />
                <Route path='/room/:roomName' component={Room} />
            </Switch>
        </Router>
    );
}

export default App;