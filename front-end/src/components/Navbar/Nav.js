import React, { useState, useEffect } from 'react'
import { ReactComponent as BellIcon } from '../icons/bell.svg'
import { ReactComponent as MessengerIcon } from '../icons/messenger.svg'
import { ReactComponent as CaretIcon } from '../icons/caret.svg'
import { ReactComponent as PlusIcon } from '../icons/plus.svg'
import { ReactComponent as Login } from '../icons/login.svg'
import NavItem from './NavItem'
import DropdownMenu from './DropdownMenu'
import Loading from '../Loading'
import onClickOutside from 'react-onclickoutside'
import './Nav.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Nav({ setDarkMode, darkMode }) {
  const [open, setOpen] = useState(false)
  const { checkLoginStatus, currentUser } = useAuth()
  useEffect(() => {
    checkLoginStatus()
  }, [])
  Nav.handleClickOutside = () => setOpen(false);

  return (
      <ul className="navbar-nav">
        <NavItem icon={<PlusIcon />} />
        <NavItem icon={<BellIcon />} />
        <NavItem icon={<MessengerIcon />} />
        {Object.keys(currentUser).length ? (
        <NavItem open={open} setOpen={setOpen} icon={<CaretIcon />} >
          <DropdownMenu setDarkMode={setDarkMode} darkMode={darkMode} />
        </NavItem>
        ) : (
          <Link to='/auth'>
            <NavItem icon={<Login />} />
          </Link>
        )}
      </ul>
  )
}


const ClickOutsideConfig = {
  handleClickOutside: () => Nav.handleClickOutside
}

export default onClickOutside(Nav, ClickOutsideConfig)