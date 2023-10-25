import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TaskItem } from './TaskCard'
import { TaskObject } from './TasksView'

export function DatePickerWithPresets({
  task,
  setTasks,
}: {
  task: TaskItem
  setTasks: React.Dispatch<React.SetStateAction<TaskObject>>
}) {
  const [date, setDate] = React.useState<Date | undefined>(task.dueDate)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setTasks((prev) => {
      return {
        ...prev,
        [task.status]: prev[task.status].map((t) => {
          if (t.id === task.id) {
            t.dueDate = date
          }
          return t
        }),
      }
    })
  }, [date])

  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => {
            setOpen(!open)
          }}
          variant="ghost"
        >
          <span
            className={
              date && new Date(date).getTime() - Date.now() < 0 ? 'text-red-600' : 'text-black'
            }
          >
            {!date ? 'No Deadline' : `Due on ${new Date(date).toLocaleDateString()}`}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) => {
            setDate(addDays(new Date(), parseInt(value)))
            setOpen(false)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
