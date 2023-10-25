import { useEffect, useState } from 'react'

export const Clock = () => {
  const getTime = () => {
    const date = new Date()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const [time, setTime] = useState<string>(getTime())

  useEffect(() => {
    let intervalId = setInterval(() => {
      setTime(getTime())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return <h1 className="text-white text-center select-none text-[9rem] tracking-wider ">{time}</h1>
}
