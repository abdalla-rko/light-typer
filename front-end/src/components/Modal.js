import React from 'react'
import ReactDom from 'react-dom';
import './Modal.css'

const Modal = ({ title, darkMode, isModalOpen, onClose, children }) => {
  return ReactDom.createPortal(
    <div className={`${darkMode ? "dark" : "light"}`}>
      <div onClick={onClose} className={`modal-overlay ${isModalOpen ? 'active' : ''}`}></div>
      <div className={`modal ${isModalOpen ? 'active' : ''}`}>
        <div className="modal-header">
          <div className="title">
            {title}
          </div>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  )
}

export default Modal
