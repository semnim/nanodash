import { TaskItem } from './TaskItemCard'

const sortByCompleted = (tasks: TaskItem[]) => {
  return tasks.toSorted((x, y) => (x.completed === y.completed ? 0 : x ? -1 : 1)).reverse()
}

export { sortByCompleted }
