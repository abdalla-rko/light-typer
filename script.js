window.addEventListener('load', renderNewQuote)

const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.querySelector("#quote-display")
const quoteInputElement = document.querySelector("#quote-input")
const timerElement = document.querySelector('#timer')


quoteInputElement.addEventListener('keypress', userStartedTyping)

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')
  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false 
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })
  console.log("user called typing ", correct);
  if (correct) {
    console.log("loggen to mcuh");
    quoteInputElement.addEventListener('keypress', userStartedTyping)
    renderNewQuote()
  }
})

async function getRandomQuote() {
  const response = await fetch(RANDOM_QUOTE_API_URL);
  const data = await response.json()
  return data.content
}

async function checkTheWords() {
  quoteDisplayElement.innerHTML = null
  quote.split('').forEach((character, index) => {
    const wordSpan = document.createElement('span')
    wordSpan.innerText = character
    const checkSpanExist = quoteDisplayElement.querySelector('span')
    if (checkSpanExist) {
      console.log("no span");
      quoteDisplayElement.appendChild(wordSpan)
    } else {
      console.log("span exist")
      quoteDisplayElement.prepend(wordSpan)
    }
  })
}

async function userStartedTyping() {
  quoteInputElement.removeEventListener('keypress', userStartedTyping)
  checkTheWords()
  startTimer()
}

let quote
async function renderNewQuote() {
  quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = quote;
  console.log(quote);
  quoteInputElement.value = null;
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