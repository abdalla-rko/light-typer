import React, { useState, useEffect } from 'react'
import Quote from './Quote'
import './Form.css'
import moment from 'moment';

const Form = () => {
  const [inputText, setInputText] = useState('');
  const [timeInterval, setTimeInterval] = useState({})
  const [time, setTime] = useState('0')
  const [wpm, setWpm] = useState('0')
  const [quote, setQuote] = useState('')
  const [typing, setTyping] = useState(false)
  const [finished, setFinshed] = useState(false)

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
    setTime('0')
    setWpm('0')
    renderNewQuote()
  }, [finished])
  
  useEffect(() => {
      const getWPM = () => {
        if (time > 0) setWpm(Math.round(inputText.length / 5 / (time / 60)))
      }
      console.log('getting ',);
      const wpmInterval = setInterval(getWPM, 100);
    return () => {
      clearInterval(wpmInterval)
    }
  }, [time])

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
  
  const convertTime = (sec, zero = 0) => {
    return sec + zero > 9 ? sec : "0" + sec;
  }

  return (
    <div className="form">
      <div className="container">
      <div className="timer">
  <div>{convertTime(parseInt(time / 60, 10), 10)}:{convertTime(time % 60)}</div>
        <div>{wpm} wpm</div>
      </div>
        <Quote quote={quote} typing={typing} inputText={inputText} setFinshed={setFinshed} finished={finished} />
        <textarea onChange={inputTextHandler} value={inputText} className="quote-input" autoFocus></textarea>
      </div>
    </div>
  )
}

export default Form