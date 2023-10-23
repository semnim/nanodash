import { useEffect, useRef, useState } from 'react'
import { TaskItem, TaskItemCard } from './TaskItemCard'
import { sortByCompleted } from './taskUtils'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import autoAnimate from '@formkit/auto-animate'

export interface TasksListProps {
  tasks: TaskItem[]
}

export const TasksList = ({ tasks }: TasksListProps) => {
  const [taskItems, setTaskItems] = useState<TaskItem[]>([])

  const parent = useRef(null)

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current, {
        easing: 'ease-in-out',
        duration: 300,
      })
    }
  }, [parent])

  useEffect(() => {
    setTaskItems(sortByCompleted(tasks))
  }, [tasks])

  return (
    <div className="container my-2" ref={parent}>
      {taskItems.map((task) => (
        <TaskItemCard key={task.id} task={task} setTaskItems={setTaskItems} />
      ))}
    </div>
  )
}
