import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Form from './components/Form'
import Signup from './components/Auth/Signup'
import About from './components/About'
import Error from './components/Error'
import PrivateRotue from './components/PrivateRoute'
import Modal from './components/Modal'
import useLocalStorage from './hooks/useLocalStorage'
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const [darkMode, setDarkMode] = useState(getTheme())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isStatsOpen, setIsStatsOpen] = useState(false)
  const [storageValue, setStorageValue] = useLocalStorage()

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

  const averageSpeed = () => {
    const sumArray = storageValue.average.reduce((a, b) => a + b, 0)
    const avgNum = Math.round((sumArray / storageValue.average.length))
    return avgNum
  }

  return (
    <Router>
      <div className={`${darkMode ? "dark" : "light"}`}>
        <AuthProvider>
          <header>
            <Navbar setDarkMode={setDarkMode} darkMode={darkMode} setIsModalOpen={setIsModalOpen} setIsStatsOpen={setIsStatsOpen} />
          </header>
          <Modal title="Log In" darkMode={darkMode} isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
            <Signup />
          </Modal>
          <Modal title="Stats" darkMode={darkMode} isModalOpen={isStatsOpen} onClose={() => setIsStatsOpen(false)} >
            <div className="stats">
              <h3>Average Speed: {averageSpeed()}</h3>
              <h3>Last Test Speed: {storageValue.last} wpm</h3>
              <h3>Fastest Test Speed: {storageValue.fastest} wpm</h3>
              <h4>Sign in to save your progress!</h4>
            </div>
          </Modal>
          <Switch>
            <Route path="/" exact>
              <Form storageValue={storageValue} setStorageValue={setStorageValue} />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="*">
              <Error />
            </Route>
            {/* <PrivateRotue path="/auth" exact>
              <Signup />
            </PrivateRotue> */}
            {/* <Route path="/about" exact component={Home} /> */}
            {/* <Route path="/" exact component={Error} /> */}
          </Switch>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
