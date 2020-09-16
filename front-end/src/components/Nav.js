import React from 'react'
import './Nav.css'

const Nav = () => {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <h4>Pigeon</h4>
      </div>
      <ul className="nav-links">
        <li className="nav-item"><a href="#" className="nav-link">Home</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Stats</a></li>
        <li className="nav-item"><a href="#" className="nav-link">About</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Account</a></li>
      </ul>
      <div className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  )
}

export default Nav