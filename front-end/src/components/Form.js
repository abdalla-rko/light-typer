import React, { useState, useEffect } from 'react'
import Quote from './Quote'
import './Form.css'

const Form = () => {
  // state
  const [inputText, setInputText] = useState('');
  const [timeInterval, setTimeInterval] = useState({})
  const [time, setTime] = useState('')
  const [quote, setQuote] = useState('')
  const [typing, setTyping] = useState(false)
  const [finished, setFinshed] = useState(false)
  // useEffect
  useEffect(() => {
    const userStartedTyping = (e) => {
      window.removeEventListener('keypress', userStartedTyping)
      setTyping(true)
      startTimer()
    }
    async function renderNewQuote() {
      const quote = await getRandomQuote()
      setQuote(quote)
      setInputText('')
    }
    window.addEventListener("keypress", userStartedTyping)
    setTyping(false)
    clearInterval(timeInterval.timeInterval)
    setTime('')
    renderNewQuote()
  }, [finished])
  // functions 
  const getRandomQuote = async () => {
    const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
    const response = await fetch(RANDOM_QUOTE_API_URL);
    const data = await response.json()
    return data.content
  }

  const inputTextHandler = (e) => {
    setInputText(e.target.value)
  }

  const startTimer = () => {
    setTime('0')
    let startTime = new Date()
    const getTimerTime = () => setTime(Math.floor((new Date() - startTime) / 1000))
    const timeInterval = setInterval(getTimerTime, 1000)
    setTimeInterval({timeInterval: timeInterval})
  }
  return (
    <div className="form">
      <div className="timer">{time}</div>
      <div className="container">
        <Quote quote={quote} typing={typing} inputText={inputText} setFinshed={setFinshed} finished={finished} />
        <textarea onChange={inputTextHandler} value={inputText} className="quote-input" autoFocus></textarea>
      </div>
    </div>
  )
}

export default Form