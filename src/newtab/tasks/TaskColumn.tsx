import React, { useEffect, useRef } from 'react'
import { Draggable, DroppableProvided } from 'react-beautiful-dnd'
import { TaskItem, TaskCard } from './TaskCard'
import { AddCardPlaceholder } from './AddCardPlaceholder'
import { TaskObject } from './TasksView'
import { v4 as uuidv4 } from 'uuid'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import autoAnimate from '@formkit/auto-animate'

export interface TasksListProps {
  tasks: TaskItem[]
  setTasks: React.Dispatch<React.SetStateAction<TaskObject>>
  title: 'To Do' | 'Doing' | 'Done'
  provided: DroppableProvided
}

export const TaskColumn = ({ provided, tasks, setTasks, title }: TasksListProps) => {
  const handleAddTask = () =>
    setTasks((prev) => {
      const newTask: TaskItem = {
        id: uuidv4(),
        title: '',
        description: '',
        dueDate: undefined,
        priority: 'low',
        status: 'todo',
        completed: false,
      }
      const newObj = {
        ...prev,
        ['todo']: [...prev.todo, newTask],
      }
      return newObj
    })

  const parent = useRef<HTMLDivElement>(null)
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [])
  return (
    <div
      className={`w-full flex flex-col justify-start ${
        title === 'Doing' &&
        'lg:border-l-slate-200 lg:border-l-2 lg:border-r-slate-200 lg:border-r-2'
      }`}
    >
      <h2 className="text-center scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-white">
        {title}
      </h2>
      {title === 'To Do' && <AddCardPlaceholder onClick={handleAddTask} />}
      <div ref={provided.innerRef} {...provided.droppableProps} className="grow">
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
            {(provided) => (
              <div
                className="mx-4"
                key={task.id}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <TaskCard key={task.id} task={task} setTasks={setTasks} />
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  )
}
