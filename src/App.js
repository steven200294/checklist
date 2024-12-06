import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Checklist from './components/Checklist';
import Form from './components/Form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/checklist/:id" element={<Checklist />} />
        <Route path="/form/:id?" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;