import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Input } from '@/components/ui/input'

export type User = { name: string }
export const UserGreeting = () => {
  const { getItem, setItem } = useLocalStorage('user')

  const [user, setUser] = useState<User | undefined>(getItem())

  const [userName, setUserName] = useState('')

  const handleChange = (newValue: string) => {
    setUserName(newValue)
  }
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setUser((_) => {
        const newUser = {
          name: userName,
        }
        setItem(newUser)
        return newUser
      })
    }
  }
  const timeOfDay = ['Morning', 'Afternoon', 'Evening', 'Night']
  const [greetingPrefix, setGreetingPrefix] = useState('')

  useEffect(() => {
    const dateTime = new Date()
    const hourOfDay = dateTime.getHours()
    if (hourOfDay >= 6 && hourOfDay <= 12) {
      setGreetingPrefix(timeOfDay[0])
    } else if (hourOfDay > 12 && hourOfDay <= 18) {
      setGreetingPrefix(timeOfDay[1])
    } else if (hourOfDay > 18 && hourOfDay <= 22) {
      setGreetingPrefix(timeOfDay[2])
    } else {
      setGreetingPrefix(timeOfDay[3])
    }
  }, [])

  const userNameElRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!userNameElRef.current) {
      return
    }

    setTimeout(() => {
      if (userNameElRef.current) {
        userNameElRef.current.classList.toggle('active')
      }
    }, 2500)
    setTimeout(() => {
      if (userNameElRef.current) {
        userNameElRef.current.classList.toggle('active')
      }
    }, 1000)
  }, [userNameElRef])

  const welcomeMessage = (
    <h2 className="text-[5rem] text-center select-none text-slate-100 [text-shadow:_0_2px_0_rgb(0_0_0_/_40%)] font-medium tracking-wider">
      {`Good ${greetingPrefix}, `}
      <span className="hover-underline-animation" ref={userNameElRef}>
        {user?.name}
      </span>
    </h2>
  )

  const userNameForm = (
    <>
      <h2 className="mb-4 text-2xl">Please enter your name:</h2>
      <Input
        className="mx-auto max-w-xs text-xl"
        value={userName}
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={handleKeyDown}
      ></Input>
    </>
  )

  return user ? welcomeMessage : userNameForm
}
