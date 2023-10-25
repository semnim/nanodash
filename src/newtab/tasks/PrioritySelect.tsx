import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { priorityColors } from './TaskCard'
import { useState } from 'react'

export const capitalize = (word: string) => {
  return `${word[0].toUpperCase()}${word.slice(1)}`
}

export type Priority = 'low' | 'medium' | 'high'
interface PrioritySelectProps {
  initialPriority: Priority
  submitChanges: (newValue: 'low' | 'medium' | 'high') => void
}

export const PrioritySelect = ({ initialPriority, submitChanges }: PrioritySelectProps) => {
  const priorities: Priority[] = ['low', 'medium', 'high']
  const [priority, setPriority] = useState<Priority>(initialPriority)

  return (
    <Select
      defaultOpen
      defaultValue={initialPriority}
      onValueChange={(newValue: Priority) => {
        submitChanges(newValue)
        setPriority(newValue)
      }}
    >
      <SelectTrigger
        onBlur={() => submitChanges(priority)}
        className="w-[180px] border-0 p-0 outline-0 ring-0 outline-none focus:ring-0 shadow-none"
      >
        <SelectValue
          placeholder={capitalize(priority)}
          className={`text-sm ${priorityColors[priority]}`}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Priorities</SelectLabel>
          {priorities.map((prio) => (
            <SelectItem className={`text-[${priorityColors[priority]}]`} value={prio}>
              {capitalize(prio)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
