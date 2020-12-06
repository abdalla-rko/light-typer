import React, { useState, useEffect } from 'react'
import { ReactComponent as CaretIcon } from '../icons/caret.svg'
import NavItem from './NavItem'
import DropdownMenu from './DropdownMenu'
import Modal from '../Modal'
import Loading from '../Loading'
import onClickOutside from 'react-onclickoutside'
import './Nav.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Nav({ setDarkMode, darkMode, setIsModalOpen, setIsStatsOpen }) {
  const [open, setOpen] = useState(false)
  const { checkLoginStatus, currentUser } = useAuth()
  useEffect(() => {
    checkLoginStatus()
  }, [])
  Nav.handleClickOutside = () => setOpen(false);

  return (
      <ul className="div-navbar">
        <div className="navbar-nav">
            <Link to='/'>
              <div className="logo">Light-Typing</div>
            </Link>
          <NavItem text="Home" />
          <div onClick={() => setIsStatsOpen(true)}>
            <NavItem text="Stats" />
          </div>
          <Link to='/auth'>
            <NavItem text="About" />
          </Link>
        </div>
        <div className="login">
          {Object.keys(currentUser).length ? (
          <NavItem open={open} setOpen={setOpen} icon={<CaretIcon />} >
            <DropdownMenu setDarkMode={setDarkMode} darkMode={darkMode} />
          </NavItem>
          ) : (
            <div onClick={() => setIsModalOpen(true)}>
              <NavItem text="Log In" />
            </div>
          )}
        </div>
      </ul>
  )
}


const ClickOutsideConfig = {
  handleClickOutside: () => Nav.handleClickOutside
}

export default onClickOutside(Nav, ClickOutsideConfig)