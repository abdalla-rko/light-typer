import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Form from './components/Form'
import Signup from './components/Auth/Signup'
import PrivateRotue from './components/PrivateRoute'
import Modal from './components/Modal'
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const [darkMode, setDarkMode] = useState(getTheme())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isStatsOpen, setIsStatsOpen] = useState(false)

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
            <Navbar setDarkMode={setDarkMode} darkMode={darkMode} setIsModalOpen={setIsModalOpen} setIsStatsOpen={setIsStatsOpen} />
          </header>
          <Modal title="Log In" isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
            <Signup />
          </Modal>
          <Modal title="Log In" isModalOpen={isStatsOpen} onClose={() => setIsStatsOpen(false)} >
            <Signup />
          </Modal>
          <Switch>
            <Route path="/" exact component={Form} />
            <PrivateRotue path="/auth" exact>
              <Signup />
            </PrivateRotue>
            {/* <Route path="/about" exact component={Home} /> */}
            {/* <Route path="/" exact component={Error} /> */}
          </Switch>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
