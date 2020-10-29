import React from 'react'
import Nav from './Nav'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = ({ setDarkMode, darkMode }) => {
  return (
    <nav className="navbar">
      <div className="div-navbar">
        <div className="logo">Light-Typing</div>
        <Nav setDarkMode={setDarkMode} darkMode={darkMode} />
      </div>
    </nav>
  )
}

export default Navbar