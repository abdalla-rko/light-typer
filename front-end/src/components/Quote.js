import React, { useState, useEffect } from 'react'

const Quote = ({ quote, typing, inputText, setFinshed, finished }) => {
  const [checkCharacters, setCheckCharacters] = useState([])

  useEffect(() => {
    const inputTextArray = inputText.split('')
    setCheckCharacters(inputTextArray)
    if(quote) {
      if(JSON.stringify(quote.split('')) === JSON.stringify(inputTextArray)) {
        setFinshed(!finished)
      }
    }
  }, [inputText])

  return (
    <div>
      <div className="quote-display">
        {typing ? quote.split('').map((character, index) => <span className={`${checkCharacters[index] ? character === checkCharacters[index] ? "correct" : "incorrect" : ""}`} key={index}>{character}</span>)
        : quote}
      </div>
    </div>
  )
}

export default Quote