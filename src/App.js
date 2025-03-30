import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import HousePrice from './HousePrice';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/house_prices" element={<HousePrice />} />
      </Routes>
    </Router>
  );
}

export default App;
