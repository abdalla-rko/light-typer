import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav'
import Form from './components/Form'

function App() {
  return (
  <div className="App">
    <header>
      <Nav />
    </header>
    <Form />
  </div>);
}

export default App;
