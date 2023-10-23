import { useState, useEffect } from 'react'
import './NewTab.css'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const NewTab = () => {
  const getTime = () => {
    const date = new Date()
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return `${hour}:${minute}`
  }

  const [time, setTime] = useState(getTime())
  const link = 'https://github.com/guocaoyi/create-chrome-ext'

  useEffect(() => {
    let intervalId = setInterval(() => {
      setTime(getTime())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <section className="h-screen w-screen">
      <h1>{time}</h1>
      <Button>Test</Button>
    </section>
  )
}

export default NewTab
