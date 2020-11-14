import React, { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ReactComponent as CogIcon } from '../icons/cog.svg'
import { ReactComponent as CheveronIcon } from '../icons/chevron.svg'
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg'
import { ReactComponent as Moon } from '../icons/moon-solid.svg'
import { ReactComponent as LogOut } from '../icons/log-out.svg'
import { ReactComponent as QuestionCircle } from '../icons/question-circle.svg'
import { useAuth } from '../../contexts/AuthContext'
import './DropdownMenu.css'

function DropdownMenu({ setDarkMode, darkMode }) {
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null)
  const { currentUser } = useAuth()
  const dropdownRef = useRef(0);

  console.log('use', currentUser);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height)
  }

  function DropdownItem(props) {
    const whenClicked = () => {
      console.log('clicked', props.darkMode)
      props.goToMenu && setActiveMenu(props.goToMenu)
      return props.darkMode === undefined ? null : props.setDarkMode(!props.darkMode)
    }
    return (
      <a href="#" className="menu-item" onClick={whenClicked}>
        <span className="icon-button dropdown-icons">{props.leftIcon}</span>
        {props.children}
        {props.rightIcon && <span className="icon-right">{props.rightIcon}</span>}
      </a>
    )
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary" onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem leftIcon={<img src={currentUser.picture} alt="avatar"/>} >{currentUser.username}</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />} rightIcon={<CheveronIcon />} goToMenu="settings">settings</DropdownItem>
          <DropdownItem leftIcon={<QuestionCircle />} >About</DropdownItem>
          <DropdownItem leftIcon={<LogOut />} >Log Out</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === 'settings'} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main" />
          <DropdownItem leftIcon={<Moon />} darkMode={darkMode} setDarkMode={setDarkMode}>
            Dark Mode
            <input className="icon-right toggle-theme-input" type="checkbox" id="switch" checked={darkMode} /><label className="toggle-theme-label" htmlFor="switch">Toggle</label>
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}


export default DropdownMenu
