import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar";

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Posts from './pages/Posts';
import Equipments from './pages/Equipments';
import Dashboard from './pages/Dashboard';
import Auditorium from './pages/gyms/Auditorium';
import Heemang from './pages/gyms/Heemang';
import Mir from './pages/gyms/Mir';
import Silloe from './pages/gyms/Silloe';
import Yeoul from './pages/gyms/Yeoul';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/equipments" element={<Equipments />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auditorium" element={<Auditorium />} />
        <Route path="/heemang" element={<Heemang />} />
        <Route path="/mir" element={<Mir />} />
        <Route path="/silloe" element={<Silloe />} />
        <Route path="/yeoul" element={<Yeoul />} />
      </Routes>
    </Router>
  )
}

export default App;