import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Form from './components/Form'
import Signup from './components/Auth/Signup'
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const [darkMode, setDarkMode] = useState(getTheme())
  const [loggedIn, setLoggedIn] = useState(checkLoginStatus)

  async function checkLoginStatus() {
    const response = await fetch('/auth/logged', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const data = await response.json()
    return data
  }

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
    <Router>
      <div className={`${darkMode ? "dark" : "light"}`}>
        <AuthProvider>
          <header>
            <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
          </header>
          {/* <Signup /> */}
          <Form />
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
