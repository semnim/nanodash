import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { DatePickerWithPresets } from './DatePicker'
import { EditableTextComponent } from './EditableTextComponent'
import { Cross2Icon } from '@radix-ui/react-icons'
import { EditablePriorityLabel } from './EditablePriorityLabel'
import { TaskObject } from './TasksView'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState } from 'react'

export interface TaskItem {
  id: string
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
  low: 'bg-green-600',
  medium: 'bg-yellow-600',
  high: 'bg-red-600',
}
export const TaskCard = ({ task, setTasks }: TaskItemCardProps) => {
  const handleApplyLabelEditChanges = (newValue: string, field: 'title' | 'description') =>
    setTasks((prev) => {
      const status = task.status
      const newTasks = prev[status].map((t) => {
        if (t.id === task.id) {
          return { ...task, [field]: newValue }
        }
        return t
      })

      return {
        ...prev,
        [status]: newTasks,
      }
    })
  const handleApplyPriorityEditChanges = (newValue: 'low' | 'medium' | 'high') =>
    setTasks((prev) => {
      const status = task.status

      const newTasks = prev[status].map((t) => {
        if (t.id === task.id) {
          return { ...task, ['priority']: newValue }
        }
        return t
      })

      return {
        ...prev,
        [status]: newTasks,
      }
    })

  const handleDeleteTask = () => {
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
  const [parent] = useAutoAnimate()
  return (
    <div className="py-4 select-none" ref={parent}>
      <Card
        className={`min-w-[275px] bg-primary min-h-[200px] mx-auto ${
          task.completed && 'line-through'
        }`}
      >
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-[1.2rem] flex-grow">
            <EditableTextComponent
              initialValue={task.title}
              applyChanges={(newValue) => handleApplyLabelEditChanges(newValue, 'title')}
            />
          </CardTitle>
          <Button variant="ghost" onClick={handleDeleteTask}>
            <Cross2Icon />
          </Button>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <EditableTextComponent
            initialValue={task.description}
            type="textarea"
            applyChanges={(newValue) => handleApplyLabelEditChanges(newValue, 'description')}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <EditablePriorityLabel
            key={task.priority}
            priority={task.priority}
            applyChanges={handleApplyPriorityEditChanges}
          ></EditablePriorityLabel>
          <DatePickerWithPresets task={task} setTasks={setTasks} />
        </CardFooter>
      </Card>
    </div>
  )
}
