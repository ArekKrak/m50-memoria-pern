import './App.css';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateNote from './pages/CreateNote';
import EditNote from './pages/EditNote';
import memoriaLogo from '/banner.svg';

function App() {
  const [user, setUser] = useState(null);

  const refreshUser = () => {
    fetch("http://localhost:3000/me", {
      credentials: "include" // Tells the browser to send the session cookie to the backend.
    })
      .then(res => {
        if (!res.ok) return null;
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => setUser(null));
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <>
      <Navbar bannerSrc={memoriaLogo} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login refreshUser={refreshUser} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard user={user} refreshUser={refreshUser} />} />
        <Route path='/notes/new' element={<CreateNote user={user} />} />
        <Route path='/notes/:id/edit' element={<EditNote />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
