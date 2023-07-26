import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'; // 'Switch' 대신 'Routes'를 사용

import Login from './accounts/login';

function App() {
  return (
    <Router>
      <div>
        <Link to="/login">로그인</Link>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
