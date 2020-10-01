import React, { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ReactComponent as CogIcon } from '../icons/cog.svg'
import { ReactComponent as CheveronIcon } from '../icons/chevron.svg'
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg'
import './DropdownMenu.css'

function DropdownMenu({ setDarkMode, darkMode }) {
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null)
  const dropdownRef = useRef(0);


  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height)
  }

  function DropdownItem(props) {
    const whenClicked = () => {
      props.goToMenu && setActiveMenu(props.goToMenu)
      return props.darkMode === undefined ? null : props.setDarkMode(!props.darkMode)
    }
    return (
      <a href="#" className="menu-item" onClick={whenClicked}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary" onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>Home</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />} rightIcon={<CheveronIcon />} goToMenu="settings">settings</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === 'settings'} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main" />
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem darkMode={darkMode} setDarkMode={setDarkMode}>Dark Mode</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}


export default DropdownMenu
