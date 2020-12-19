import React, { useState, useEffect } from 'react'
import Quote from './Quote'
import './Form.css'

const Form = ({storageValue, setStorageValue}) => {
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
    function updateStatics() {
      let fastestTest = storageValue.fastest
      const isFastestSpeed = wpm > fastestTest && storageValue.average.every(num => num > fastestTest)
      if(isFastestSpeed) {
        if(wpm > fastestTest) fastestTest = wpm 
        else fastestTest = storageValue.average.filter(num => num > fastestTest)[0]
      }
      let averageTest = storageValue.average
      if(storageValue.average.length > 10) averageTest = storageValue.average.slice(1)
      return {last: wpm, average: [...averageTest, wpm], fastest: fastestTest}
    }
    if(wpm > 0) setStorageValue(updateStatics())
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

  const timer = () => {
    return `${convertTime(parseInt(time / 60, 10), 10)}:${convertTime(time % 60)}`
  }

  return (
    <div className="form">
      <div className="container">
      <div className="timer">
      <div>{timer()}</div>
        <div>{wpm} wpm</div>
      </div>
        <Quote quote={quote} typing={typing} inputText={inputText} setFinshed={setFinshed} finished={finished} />
        <textarea onChange={inputTextHandler} value={inputText} className="quote-input" autoFocus></textarea>
      </div>
    </div>
  )
}

export default Form