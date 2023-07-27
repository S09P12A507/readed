import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './accounts/login';
import Signup from './accounts/signup';
import Emailcheck from './accounts/emailcheck';
import Addprofile from './accounts/addprofile';

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
