import React from 'react'
import Load from './icons/loading.svg'
import './Loading.css'

function Loading() {
  return (
    <div className="spinner">
      <img src={Load} alt="Loading"/>
    </div>
  )
}

export default Loading
