import { useEffect, useState, useMemo } from 'react';
import './App.css';
import Login from './pages/Login';
import Main from './pages/Main';
import io from 'socket.io-client'

const socket = io.connect('http://192.168.0.27:3001')


function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState()
  const [color, setColor] = useState()
  const [loading, setLoading] = useState(true)
  const [online, setOnline] = useState([])
  
  const room_info = {
    room: 'TGN-INNER-CIRCLE',
    user: user
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(localStorage.getItem('user'))
      setColor(localStorage.getItem('color'))
      setAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const onLogin = (user, color) => {
    setUser(user)
    setColor(color)
    localStorage.setItem('user', user)
    localStorage.setItem('color', color)
    socket.emit("join_room", room_info);
    socket.on('online_users', (online_users) => {
      console.log('online_users', online_users)
    })
    setAuthenticated(true)
  }

  const onLogout = () => {
    setAuthenticated(false)
    socket.off("receive_message", {});
    localStorage.removeItem('user')
    localStorage.removeItem('color')
  }

  return (
    <div className="App">
      {
        loading ? null : authenticated ? <Main socket={socket} room={room_info.room} user={user} color={color} onLogout={onLogout} online={online}/> : 
        <Login onLogin={onLogin} />
      }
    </div>
  );
}

export default App;
