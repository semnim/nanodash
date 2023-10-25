import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { TaskColumn } from './TaskColumn'
import { useEffect, useState } from 'react'
import { TaskItem } from './TaskCard'
import { useLocalStorage } from '../hooks/useLocalStorage'

export type TaskObject = { todo: TaskItem[]; doing: TaskItem[]; done: TaskItem[] }

export const TasksView = () => {
  const { setItem, getMultipleItems, remove } = useLocalStorage('task')

  const fromStorage = getMultipleItems()
  const initial = {
    todo: fromStorage.filter((t) => t.status === 'todo' && !t.completed),
    doing: fromStorage.filter((t) => t.status === 'doing' && !t.completed),
    done: fromStorage.filter((t) => t.completed),
  }
  const [tasks, setTasks] = useState<TaskObject>(initial)

  useEffect(() => {
    const allTasks = [...tasks.todo, ...tasks.doing, ...tasks.done]
    const allItems = getMultipleItems()

    if (allItems.length > allTasks.length) {
      allItems.forEach((item) => {
        if (!allTasks.find((t) => t.id === item.id)) {
          remove(`task-${item.id}`)
        }
      })
    }
    allTasks
      .map((task) => ({ ...task, dueDate: new Date(task.dueDate ?? Date.now()).toISOString() }))
      .forEach((task) => {
        setItem(task, `task-${task.id}`)
      })
  }, [tasks])

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

    updatedTasks[destinationColumnId][destinationIndex].status = destinationColumnId
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
