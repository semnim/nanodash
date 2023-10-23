import { useDrag } from 'react-dnd'
import { sortByCompleted } from './taskUtils'

export interface TaskItem {
  id: number
  title: string
  description: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
}

interface TaskItemCardProps {
  task: TaskItem
  setTaskItems: React.Dispatch<React.SetStateAction<TaskItem[]>>
}

export const ItemTypes = {
  TASK: 'TASK',
}

export const TaskItemCard = ({ task, setTaskItems }: TaskItemCardProps) => {
  const [, ref] = useDrag({
    type: ItemTypes.TASK, // Specify the item type (e.g., 'TASK')
    item: { id: task.id },
  })

  const priorityColors = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600',
  }

  const handleClick = (task: TaskItem) => {
    setTaskItems((prev) => {
      const newTasks = [
        ...prev.filter((taskItem) => taskItem.id !== task.id),
        { ...task, completed: !task.completed },
      ]

      return sortByCompleted(newTasks)
    })
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 cursor-pointer transition-transform transition-[line-through] transform hover:bg-gray-100 ${
        task.completed ? 'line-through' : ''
      }`}
      onClick={() => handleClick(task)}
      ref={ref}
    >
      <h2 className="text-xl font-semibold">{task.title}</h2>
      <p className="text-gray-600 mb-2">{task.description}</p>
      <div className="flex justify-between items-center">
        <span className={`text-sm ${priorityColors[task.priority]}`}>{task.priority}</span>
        <span className="text-sm text-gray-600">
          Due on {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}
