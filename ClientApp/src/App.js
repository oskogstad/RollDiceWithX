import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Home from './components/Home';
import Counter  from './components/Counter';

const App = () => {
    return (
        <Router>
            <NavMenu/>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
            </Switch>
        </Router>
    );
}

export default App;