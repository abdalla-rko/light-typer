import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Form from './components/Form'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

function App() {
  const [darkMode, setDarkMode] = useState(getTheme())

  function getTheme(){
    const themeInStorage = JSON.parse(localStorage.getItem('theme'));
    const getThemeMode = localStorage.getItem("theme");
    const matchUserTheme = getMatchUserTheme()
    if(themeInStorage) {
      return getThemeMode;
    } else if (matchUserTheme) {
      return true;
    } else {
      return false;
    }
  }

  function getMatchUserTheme() {
    if(!window.matchMedia) return;
    return window.matchMedia("prefers-color-scheme: dark").matches;
  }

  useEffect(() => {
    const saveLocalTheme = () => {
      localStorage.setItem('theme', darkMode)
    }
    saveLocalTheme()
  }, [darkMode])
  return (
  <div className={`${darkMode ? "dark" : "light"}`}>
    <header>
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
    </header>
    <Form />
  </div>);
}

export default App;
