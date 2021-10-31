import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Counter  from './components/Counter';
import Room from './components/Room';
import './App.css';
import {useState} from "react";

const App = () => {
  const [rooms, setRooms] = useState(["room1", "room2", "room3"]);
  
  return <Router>
    <NavMenu rooms={rooms}/>
    <Switch>
      <Route exact path='/' component={Room} />
      <Route path='/about' component={Counter} />
      {rooms.map((room, index) =>
        <Route key={index} path={`/room/${room}`} component={Counter} />
      )}
      <Route path='/room/:roomName' component={Room} />
    </Switch>
  </Router>
}

export default App;