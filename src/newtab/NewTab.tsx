import { useState, useEffect } from 'react'
import './NewTab.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TaskItem } from './tasks/TaskCard'
import { TasksView } from './tasks/TasksView'
import { DrawingPinIcon, GearIcon, HomeIcon, LayoutIcon } from '@radix-ui/react-icons'

export type TaskObject = { todo: TaskItem[]; doing: TaskItem[]; done: TaskItem[] }
export type User = { name: string }
export const NewTab = () => {
  const [showSeconds, setShowSeconds] = useState(true)
  const getTime = () => {
    const date = new Date()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  const [time, setTime] = useState<string>(getTime())

  const [user, setUser] = useState<User>({ name: 'Semjon' })

  useEffect(() => {
    let intervalId = setInterval(() => {
      setTime(getTime())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])
  const [tabsValue, setTabsValue] = useState<'home' | 'tasks' | 'notes' | 'settings'>('tasks')

  // todo: useAnimation https://auto-animate.formkit.com/
  return (
    <section>
      <Tabs defaultValue="tasks" className="h-screen p-4 w-screen">
        <TabsList>
          <TabsTrigger className="gap-2" value="home" onClick={() => setTabsValue('home')}>
            <HomeIcon />
            {tabsValue === 'home' && 'Home'}
          </TabsTrigger>
          <TabsTrigger className="gap-2" value="tasks" onClick={() => setTabsValue('tasks')}>
            <LayoutIcon />
            {tabsValue === 'tasks' && 'Tasks'}
          </TabsTrigger>
          <TabsTrigger className="gap-2" value="notes" onClick={() => setTabsValue('notes')}>
            <DrawingPinIcon />
            {tabsValue === 'notes' && 'Notes'}
          </TabsTrigger>
          <TabsTrigger className="gap-2" value="settings" onClick={() => setTabsValue('settings')}>
            <GearIcon />
            {tabsValue === 'settings' && 'Settings'}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <h1
            className="text-white text-center cursor-pointer select-none"
            onClick={() => setShowSeconds(!showSeconds)}
          >
            {time}
          </h1>
          <h2 className="text-white text-3xl text-center cursor-pointer select-none">
            {`Welcome, ${user.name}`}
          </h2>
        </TabsContent>

        <TabsContent value="tasks" className="grid grid-cols-3 justify-items-center gap-4">
          <TasksView />
        </TabsContent>
        <TabsContent value="notes"></TabsContent>
        <TabsContent value="settings"></TabsContent>
      </Tabs>
    </section>
  )
}
export default NewTab
