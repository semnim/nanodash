import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { TaskColumn } from './TaskColumn'
import { TaskObject } from '../NewTab'
import mockTaskItems from './mock/mockTaskItems'
import { useState } from 'react'

export const TasksView = () => {
  const initial = {
    todo: mockTaskItems.filter((t) => t.status === 'todo' && !t.completed),
    doing: mockTaskItems.filter((t) => t.status === 'doing' && !t.completed),
    done: mockTaskItems.filter((t) => t.completed),
  }
  const [tasks, setTasks] = useState<TaskObject>(initial)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return // The item was dropped outside of the valid drop area
    }

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index
    const sourceColumnId = result.source.droppableId as 'todo' | 'doing' | 'done'
    const destinationColumnId = result.destination.droppableId as 'todo' | 'doing' | 'done'

    const allTasks = [...tasks.todo, ...tasks.doing, ...tasks.done]
    const updatedTasks = { ...tasks }

    const task = allTasks.find((t) => t.id.toString() === result.draggableId)

    if (!task) {
      return
    }

    // inside same column
    if (sourceColumnId === destinationColumnId) {
      updatedTasks[sourceColumnId].splice(sourceIndex, 1)
      updatedTasks[sourceColumnId].splice(destinationIndex, 0, task)
      return
    }

    // to "done"
    if (destinationColumnId === 'done') {
      task.completed = true
      updatedTasks[sourceColumnId].splice(sourceIndex, 1)
      updatedTasks[destinationColumnId].splice(destinationIndex, 0, task)
      return
    }

    // from "done"
    if (sourceColumnId === 'done') {
      task.completed = false
    }

    updatedTasks[sourceColumnId].splice(sourceIndex, 1)
    updatedTasks[destinationColumnId].splice(destinationIndex, 0, task)
    setTasks(updatedTasks)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo">
        {(provided) => (
          <TaskColumn title={'To Do'} tasks={tasks.todo} setTasks={setTasks} provided={provided} />
        )}
      </Droppable>
      <Droppable droppableId="doing">
        {(provided) => (
          <TaskColumn title={'Doing'} tasks={tasks.doing} setTasks={setTasks} provided={provided} />
        )}
      </Droppable>
      <Droppable droppableId="done">
        {(provided) => (
          <TaskColumn title={'Done'} tasks={tasks.done} setTasks={setTasks} provided={provided} />
        )}
      </Droppable>
    </DragDropContext>
  )
}
