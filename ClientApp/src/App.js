import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Room from './components/Room';
import About from './components/About';
import './App.css';
import JoinRoomForm from "./components/JoinRoomForm";
import {UseLocalStorage} from "./utils/UseLocalStorage";

const App = () => {
  const [rooms, setRooms] = UseLocalStorage("rooms", []);
  
  const leaveRoom = (room) => {
    let index = rooms.indexOf(room);
    setRooms((rooms) => rooms.filter((r, i) => i !== index));
  }
  
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
      <Route path='/room/:roomName' render={() => (
          <Room addRoom={addRoom} leaveRoom={leaveRoom} />
      )}/>
      <Route path='*'>
        <Redirect to="/" />
      </Route>
    </Switch>
  </Router>
}

export default App;