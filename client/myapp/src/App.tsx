import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar";

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Equipments from './pages/Equipments';
import Dashboard from './pages/Dashboard';
import UserWeek from './pages/UserWeek';
import Auditorium from './pages/gyms/Auditorium';
import Heemang from './pages/gyms/Heemang';
import Mir from './pages/gyms/Mir';
import Silloe from './pages/gyms/Silloe';
import Yeoul from './pages/gyms/Yeoul';
import TempPage from './Temp';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/equipments" element={<Equipments />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userweek" element={<UserWeek/>} />
        <Route path="/auditorium" element={<Auditorium />} />
        <Route path="/heemang" element={<Heemang />} />
        <Route path="/mir" element={<Mir />} />
        <Route path="/silloe" element={<Silloe />} />
        <Route path="/yeoul" element={<Yeoul />} />
        <Route path="/temp" element={<TempPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App;