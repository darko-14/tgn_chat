import { useEffect, useState, useMemo } from 'react';
import './App.css';
import Login from './pages/Login';
import Main from './pages/Main';
import io from 'socket.io-client'

const socket = io.connect('http://192.168.0.200:3001')
const room = 'TGN-INNER-CIRCLE'

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [online, setOnline] = useState([])
  
  useEffect(() => {
    if (localStorage.getItem('user')) {
      socket.emit("join_room", room);
      setUser(localStorage.getItem('user'))
      setAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const onLogin = (user) => {
    setUser(user)
    localStorage.setItem('user', user)
    setAuthenticated(true)
  }

  const onLogout = () => {
    setAuthenticated(false)
    socket.off("receive_message", {});
    localStorage.removeItem('user')
  }

  return (
    <div className="App">
      {
        loading ? null : authenticated ? <Main socket={socket} room={room} user={user} onLogout={onLogout} online={online}/> : 
        <Login onLogin={onLogin} />
      }
    </div>
  );
}

export default App;
