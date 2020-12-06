import React from 'react'
import Nav from './Nav'
import './Navbar.css'

const Navbar = ({ setDarkMode, darkMode, setIsModalOpen, setIsStatsOpen }) => {
  return (
    <nav className="navbar">
      <Nav setDarkMode={setDarkMode} darkMode={darkMode} setIsModalOpen={setIsModalOpen} setIsStatsOpen={setIsStatsOpen} />
    </nav>
  )
}

export default Navbar