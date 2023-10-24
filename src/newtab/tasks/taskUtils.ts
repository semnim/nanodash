import { TaskItem } from './TaskCard'

export const sortTasks = (tasks: TaskItem[]) => {
  const sortedByPriority = sortByPriority(tasks)

  return sortByCompletion(sortedByPriority)
}

const compare = (first: number, second: number) => {
  return first === second ? 0 : first < second ? -1 : 1
}

const sortByCompletion = (tasks: TaskItem[]) => {
  return tasks.toSorted((x, y) => compare(+x.completed, +y.completed))
}

const sortByPriority = (tasks: TaskItem[]) => {
  const toNumeric = (priority: 'low' | 'medium' | 'high') => {
    return priority === 'low' ? 0 : priority === 'medium' ? 1 : 2
  }

  return tasks.toSorted((x, y) => compare(toNumeric(x.priority), toNumeric(y.priority))).reverse()
}
