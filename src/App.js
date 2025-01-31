import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/footer';
import Login from './components/login';
import Register from './components/register';
import Section from './components/Section';
import About from './components/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import SqlInfo from './components/ModalViewDB/sqlInfo';
function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<div style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}><Section /></div>} />
          <Route path="/about" element={<About />} />
          <Route path="/ModalViewDB/sqlInfo" element={<SqlInfo />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;