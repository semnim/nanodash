import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { useState } from 'react'
import { TaskObject } from '../NewTab'
import { Button } from '@/components/ui/button'
import { DatePickerWithPresets } from './DatePicker'

export interface TaskItem {
  id: number
  title: string
  description: string
  dueDate: Date | undefined
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'doing'
  completed: boolean
}

interface TaskItemCardProps {
  task: TaskItem
  setTasks: React.Dispatch<React.SetStateAction<TaskObject>>
}

export const ItemTypes = {
  TASK: 'TASK',
}
export const priorityColors = {
  low: 'text-green-600',
  medium: 'text-yellow-600',
  high: 'text-red-600',
}
export const TaskItemCard = ({ task, setTasks }: TaskItemCardProps) => {
  const [isEditing, setIsEditing] = useState({
    title: false,
    description: false,
    priority: false,
    date: false,
  })

  const resetTitleValEditSettings = (newTitle: string) => {
    setTitleVal(newTitle)
    setIsEditing((prev) => ({ ...prev, title: false }))
  }
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setTasks((prev) => {
        const status = task.status

        const newTasks = prev[status].map((t) => {
          if (t.id === task.id) {
            return { ...task, title: titleVal }
          }
          return t
        })

        return {
          ...prev,
          [status]: newTasks,
        }
      })
      resetTitleValEditSettings(task.title)
    }
    if (event.key === 'Escape') {
      resetTitleValEditSettings(task.title)
    }
  }
  const [titleVal, setTitleVal] = useState(task.title)
  return (
    <Card className={`w-[400px] my-4 mx-auto ${task.completed ? 'line-through' : ''}`}>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle
          onClick={() => setIsEditing({ ...isEditing, title: true })}
          className="text-[1.2rem] flex-grow"
        >
          {!isEditing.title && task.title}
          {isEditing.title && (
            <Input
              onBlur={() => resetTitleValEditSettings(titleVal)}
              className={'font-semibold leading-none tracking-tight'}
              autoFocus
              value={titleVal}
              onChange={(event) => setTitleVal(event.target.value)}
              onKeyDown={handleKeyDown}
            ></Input>
          )}
        </CardTitle>
        <Button
          variant="ghost"
          onClick={() =>
            setTasks((prev) => {
              if (task.completed) {
                return {
                  ...prev,
                  ['done']: prev['done'].filter((t) => t.id !== task.id),
                }
              }

              return {
                ...prev,
                [task.status]: prev[task.status].filter((t) => t.id !== task.id),
              }
            })
          }
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Button>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className={`text-sm ${priorityColors[task.priority]}`}>{task.priority}</span>
        <DatePickerWithPresets task={task} setTasks={setTasks} />
      </CardFooter>
    </Card>
  )
}
