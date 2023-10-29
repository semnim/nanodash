import { UserGreeting } from './UserGreeting'
import { Clock } from './Clock'
import { Quote } from './Quote'
export const HomeView = () => {
  return (
    <div className="flex flex-col items-center">
      <Clock />
      <UserGreeting />
      <Quote />
    </div>
  )
}
