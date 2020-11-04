import React from 'react'
import Nav from './Nav'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = ({ setDarkMode, darkMode }) => {
  return (
    <nav className="navbar">
      <div className="div-navbar">
        <Link to='/'>
          <div className="logo">Light-Typing</div>
        </Link>
        <Nav setDarkMode={setDarkMode} darkMode={darkMode} />
      </div>
    </nav>
  )
}

export default Navbar