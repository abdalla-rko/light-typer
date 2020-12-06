import React, { useState, useEffect } from 'react'
import './NavItem.css'

function NavItem(props) {
  const [openItem, SetOpenItem] = useState(false)
  const openNavItem = () => {
    if(props.open !== undefined) props.setOpen(!props.open)
    else SetOpenItem(!openItem)
  }
  return (
    <li className="nav-item">
      {props.icon ? 
      <a href="#" className="icon-button" onClick={openNavItem}>
        {props.icon}
      </a>
      :
      <a href="#" className="text-button" onClick={openNavItem}>
        {props.text}
      </a>
      }
      {props.open !== undefined ? props.open && props.children : null}
    </li>
  );
}

export default NavItem