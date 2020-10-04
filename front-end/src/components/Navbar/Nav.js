import React, { useState } from 'react'
import { ReactComponent as BellIcon } from '../icons/bell.svg'
import { ReactComponent as MessengerIcon } from '../icons/messenger.svg'
import { ReactComponent as CaretIcon } from '../icons/caret.svg'
import { ReactComponent as PlusIcon } from '../icons/plus.svg'
import NavItem from './NavItem'
import DropdownMenu from './DropdownMenu'
import onClickOutside from 'react-onclickoutside'
import './Nav.css'

function Nav({ setDarkMode, darkMode }) {
  const [open, setOpen] = useState(false)
  Nav.handleClickOutside = () => setOpen(false);
  return (
      <ul className="navbar-nav">
        <NavItem icon={<PlusIcon />} />
        <NavItem icon={<BellIcon />} />
        <NavItem icon={<MessengerIcon />} />
        <NavItem open={open} setOpen={setOpen} icon={<CaretIcon />} >
          <DropdownMenu setDarkMode={setDarkMode} darkMode={darkMode} />
        </NavItem>
      </ul>
  )
}


const ClickOutsideConfig = {
  handleClickOutside: () => Nav.handleClickOutside
}

export default onClickOutside(Nav, ClickOutsideConfig)