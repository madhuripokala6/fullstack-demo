import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegistrationForm from './components/RegistrationForm';
import RegistrationList from './components/RegistrationList';
import RegistrationDetail from './components/RegistrationDetail';

function App() {
  return (
    <Router>
      <ToastContainer />
      <header>
        <h1>Hack It Till You Crack It! 🎉</h1>
        <nav>
          <ul>
            <li><a href="#about">What’s the Buzz?</a></li>
            <li><a href="#schedule">Hack-A-Plan</a></li>
            <li><a href="#contact">Hit Us Up</a></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<RegistrationList />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/register/:id" element={<RegistrationForm />} />
        <Route path="/detail/:id" element={<RegistrationDetail />} />
      </Routes>
            {/* <footer>
        <p>&copy; 2024 Hack It Till You Crack It! All rights reserved. Stay cool 😎</p>
      </footer> */}
    </Router>
  );
}

export default App;
