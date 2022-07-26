import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import { useState } from 'react';
import Game from './Pages/Game';
import { io } from 'socket.io-client';


const socket = io('http://localhost:8000');

function App() {

  const [name, setName] = useState("");
  const [nick, setNick] = useState("");
  const navigate = useNavigate();
  const submit = (newNick, newName) => {
    setName(newName);
    setNick(newNick);
    socket.emit('user-connected');
    navigate("/game");
  }
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route index element={<Home submit={submit} />} />
        <Route path="game" element={<Game nick={nick} name={name} socket={socket}/>} />
      </Routes>
    </div>
  );
}

export default App;
