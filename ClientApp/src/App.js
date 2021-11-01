import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Room from './components/Room';
import About from './components/About';
import './App.css';
import {useState} from "react";
import JoinRoomForm from "./components/JoinRoomForm";

const App = () => {
  const [rooms, setRooms] = useState([]);
  
  const addRoom = (newRoom) => {
    if(rooms.includes(newRoom)) 
      return;
    
    setRooms((rooms) => [...rooms, newRoom]);
  };
  
  return <Router>
    <NavMenu rooms={rooms}/>
    <Switch>
      <Route exact path='/' render={() => (
          <JoinRoomForm addRoom={addRoom}/>
      )}/>
      <Route path='/about' component={About} />
      {rooms.map((room, index) =>
        <Route key={index} path={`/room/${room}`} component={Room} />
      )}
      <Route path='/room/:roomName' component={Room} />
    </Switch>
  </Router>
}

export default App;