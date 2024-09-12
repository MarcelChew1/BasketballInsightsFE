import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import PlayerPage from './pages/PlayerPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:playerId" element={<PlayerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
