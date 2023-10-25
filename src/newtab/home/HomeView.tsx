import { UserGreeting } from './UserGreeting'
import { Clock } from './Clock'
import { Quote } from './Quote'

export const HomeView = () => {
  return (
    <div className="grid h-screen row-span-2">
      <Clock />
      <UserGreeting />
      <Quote />
    </div>
  )
}