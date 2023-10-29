import { UserGreeting } from './UserGreeting'
import { Clock } from './Clock'
import { Quote } from './Quote'
import { WebSearch } from './WebSearch'
export const HomeView = () => {
  return (
    <div className="flex flex-col items-center">
      <Clock />
      <UserGreeting />
      <WebSearch />
      <Quote />
    </div>
  )
}
