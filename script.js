window.addEventListener('load', renderNewQuote)

const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.querySelector("#quote-display")
const quoteInputElement = document.querySelector("#quote-input")
const timerElement = document.querySelector('#timer')

async function getRandomQuote() {
  const response = await fetch(RANDOM_QUOTE_API_URL);
  const data = await response.json()
  return data.content
}

async function currentWord() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = quote;
  console.log(quote);
  // quoteDisplayElement.innerText = ''
  const words = quote.split(' ')
  return words
}


async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = quote;
  console.log(quote);
  const words = quote.split(' ')
  let index = 0
  // quote.split('').forEach(character => {
    //   const characterSpan = document.createElement('span')
    //   characterSpan.innerText = character
    //   quoteDisplayElement.appendChild(characterSpan)
    // })
    quoteInputElement.value = null;
    startTimer()
  
  quoteInputElement.addEventListener('input', () => {
    while ( index < words.length) {
      const wordSpan = document.createElement('span')
      wordSpan.innerText = words[index]
      quote.substr(quote.indexOf(words[index + 1]))
      quoteDisplayElement.prepend(wordSpan)

      const arrayQuote = quoteDisplayElement.querySelector('span').lastChild
      console.log(arrayQuote);
      const characterQuoteArray = arrayQuote.toString().split('')
      console.log("look", characterQuoteArray);
      const arrayValue = quoteInputElement.value.split('')
      let correct = true
      characterQuoteArray.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
          characterSpan.classList.remove('correct')
          characterSpan.classList.remove('incorrect')
          correct = false 
        } else if (character === characterSpan[index].innerText) {
          characterSpan.classList.add('correct')
          characterSpan.classList.remove('incorrect')
        } else {
          characterSpan.classList.remove('correct')
          characterSpan.classList.add('incorrect')
          correct = false
        }
      })
      if (correct) renderNewQuote()
    }
  })
}

let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}
