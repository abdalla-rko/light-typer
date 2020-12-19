import { useEffect, useState } from 'react'

export default function useLocalStorage() {
  const typingSpeed = 'typing-speed'
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(typingSpeed)
    if(jsonValue != null) return JSON.parse(jsonValue)
    else return {average: [], last: '0', fastest: '0'}
  })
  useEffect(() => {
    localStorage.setItem(typingSpeed, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}