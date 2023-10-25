import { UserGreeting } from './UserGreeting'
import { Clock } from './Clock'
import { Quote } from './Quote'
import { useEffect, useState } from 'react'
import { DrawingPinIcon, GearIcon, LayoutIcon } from '@radix-ui/react-icons'
export const HomeView = () => {
  return (
    <div className="flex flex-col items-center">
      <Clock />
      <UserGreeting />
      <Quote />
    </div>
  )
}
