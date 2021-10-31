import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Counter  from './components/Counter';
import Room from './components/Room';
import './App.css';

const App = () => {
  return <Router>
    <NavMenu/>
    <Switch>
      <Route exact path='/' component={Room} />
      <Route path='/about' component={Counter} />
      <Route path='/room/:roomName' component={Room} />
    </Switch>
  </Router>
}

export default App;