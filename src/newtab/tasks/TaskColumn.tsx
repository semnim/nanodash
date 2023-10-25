import React from 'react'
import { Draggable, DroppableProvided } from 'react-beautiful-dnd'
import { TaskItem, TaskCard } from './TaskCard'
import { AddCardPlaceholder } from './AddCardPlaceholder'
import { TaskObject } from './TasksView'

export interface TasksListProps {
  tasks: TaskItem[]
  setTasks: React.Dispatch<React.SetStateAction<TaskObject>>
  title: 'To Do' | 'Doing' | 'Done'
  provided: DroppableProvided
}

export const TaskColumn = ({ provided, tasks, setTasks, title }: TasksListProps) => {
  return (
    <div
      className="grid place-content-start w-full justify-stretch"
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      <h2 className="text-center scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-white">
        {title}
      </h2>
      {title === 'To Do' && (
        <AddCardPlaceholder
          onClick={() =>
            setTasks((prev) => {
              const allTasks = [...prev.todo, ...prev.doing, ...prev.done]
              const newTask: TaskItem = {
                id: Math.max(...allTasks.map((t) => t.id)) + 1,
                title: 'Add a title',
                description: 'Add a description',
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
          }
        />
      )}
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
  )
}
