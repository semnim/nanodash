import { useState, useEffect } from 'react'
import './NewTab.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import mockTaskItems from './tasks/mockTaskItems'
import { TasksList } from './tasks/TasksList'

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

  const tasks = ['eat breakfast', 'go to uni', 'work for approx. 5 hours', 'have dinner']
  return (
    <section className="">
      <h1>{time}</h1>
      <Tabs defaultValue="tasks" className="h-screen w-screen p-4">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks">
          <TasksList tasks={mockTaskItems}></TasksList>
        </TabsContent>
        <TabsContent value="notes">Change your password here.</TabsContent>
      </Tabs>
    </section>
  )
}

export default NewTab
