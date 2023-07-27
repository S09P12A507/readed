import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Emailcheck from './components/signup/emailcheck';
import Addprofile from './components/signup/addprofile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/signup/emailcheck" element={<Emailcheck />} />
        <Route path="/signup/addprofile" element={<Addprofile />} />
      </Routes>
    </Router>
  );
}

export default App;
